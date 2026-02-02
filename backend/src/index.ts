import express from "express";
import cors from "cors";
import {
  initDB,
  createExpense,
  getAllExpenses,
  deleteExpense,
} from "./database.js";
import { parseExpense } from "./services/aiService.js";

const app = express();
app.use(cors());
app.use(express.json()); // Built-in JSON parser

initDB();

// POST: Add new expense via AI parsing
app.post("/api/expenses", async (req, res) => {
  const { input } = req.body;
  try {
    const parsed = await parseExpense(input);
    if (parsed.error)
      return res.status(400).json({ success: false, error: parsed.error });

    const result = createExpense({ ...parsed, original_input: input });
    res
      .status(201)
      .json({
        success: true,
        expense: { id: result.lastInsertRowid, ...parsed },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error during parsing" });
  }
});

// GET: Retrieve all expenses
app.get("/api/expenses", (req, res) => {
  res.json({ success: true, expenses: getAllExpenses() });
});

// DELETE: Remove an expense
app.delete("/api/expenses/:id", (req, res) => {
  const success = deleteExpense(parseInt(req.params.id));
  success
    ? res.json({ success: true })
    : res.status(404).json({ success: false });
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
