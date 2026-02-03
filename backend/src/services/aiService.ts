import dotenv from "dotenv";
import OpenAI from "openai";

// 1. Load environment variables immediately
dotenv.config();

// 2. Define the Interface for strict type safety
export interface ParsedExpense {
  amount: number;
  currency: string;
  category: string;
  description: string;
  merchant: string | null;
}

// 3. Initialize the Groq client
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const parseExpense = async (input: string): Promise<ParsedExpense> => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a professional expense parser. Extract details into a JSON object.
          - amount: number (STRICTLY a number, no text or symbols)
          - currency: string (Default: 'INR')
          - category: string (Allowed: Food & Dining, Transport, Shopping, Entertainment, Bills & Utilities, Health, Travel, Other. Default: 'Other')
          - description: string
          - merchant: string or null (Default: null)
          Return ONLY a JSON object.`,
        },
        { role: "user", content: input },
      ],
      model: "llama-3.3-70b-versatile", // Verified model
      response_format: { type: "json_object" },
    });

    // 4. DEFENSIVE ACCESS: Fix for the 'choices[0]' error
    const content = chatCompletion.choices?.[0]?.message?.content;

    if (!content) {
      console.error("AI Error: Empty choices array or missing content.");
      throw new Error("AI failed to return content.");
    }

    const result = JSON.parse(content);

    // 5. POST-PROCESSING: Clean the data before returning
    let cleanAmount = 0;
    if (typeof result.amount === "number") {
      cleanAmount = result.amount;
    } else if (typeof result.amount === "string") {
      // Strips any non-numeric characters the AI might have added
      cleanAmount = parseFloat(result.amount.replace(/[^0-9.]/g, ""));
    }

    return {
      amount: isNaN(cleanAmount) ? 0 : cleanAmount, // Ensures amount passes backend check
      currency: result.currency || "INR",
      category: result.category || "Other",
      description: result.description || input,
      merchant: result.merchant || null,
    };
  } catch (error) {
    console.error("Parsing Service Error:", error);
    // Throwing error so index.ts returns 400
    throw new Error("Could not parse expense text.");
  }
};
