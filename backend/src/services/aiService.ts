import OpenAI from "openai"; // Groq uses OpenAI-compatible SDK
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const parseExpense = async (text: string) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an expense parser. Extract information from natural language.
        RULES:
        1. Amount as number (no symbols).
        2. Default currency INR.
        3. Categories: Food & Dining, Transport, Shopping, Entertainment, Bills & Utilities, Health, Travel, Other.
        4. Merchant is company/store name or null.
        RESPOND ONLY IN JSON:
        { "amount": number, "currency": string, "category": string, "description": string, "merchant": string | null }
        If invalid/no amount, return: { "error": "Could not parse expense..." }`,
      },
      { role: "user", content: text },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
};
