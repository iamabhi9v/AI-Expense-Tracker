import express from "express";
import cors from "cors";
import {
  initDB,
  createExpense,
  getAllExpenses,
  deleteExpense,
} from "./database/database.js";
import { parseExpense } from "./services/aiService.js";

const app = express();
app.use(cors());
app.use(express.json());

initDB();

// 1. POST: Add new expense
app.post("/api/expenses", async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ success: false, error: "Input is required" });
  }

  try {
    const parsed = await parseExpense(input);

    // Check if AI failed to find an amount
    if (!parsed || !parsed.amount || parsed.error) {
      return res.status(400).json({
        success: false,
        error: "Could not parse expense. Please include an amount.",
      });
    }

    const result = createExpense({ ...parsed, original_input: input });

    res.status(201).json({
      success: true,
      expense: {
        id: result.lastInsertRowid,
        ...parsed,
        original_input: input,
        created_at: new Date().toISOString(), // Ensures time displays correctly on mobile
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error during parsing" });
  }
});

// 2. GET: Retrieve all expenses
app.get("/api/expenses", (req, res) => {
  try {
    res.json({ success: true, expenses: getAllExpenses() });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch expenses" });
  }
});

// 3. DELETE: Remove an expense
app.delete("/api/expenses/:id", (req, res) => {
  try {
    const success = deleteExpense(parseInt(req.params.id));
    if (success) {
      res.json({ success: true, message: "Expense deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Delete failed" });
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
