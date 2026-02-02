import Database from "better-sqlite3";

const db = new Database("expenses.db");

export interface Expense {
  id: number;
  amount: number;
  currency: string;
  category: string;
  description: string;
  merchant: string | null;
  original_input: string;
  created_at: string;
}

export const initDB = () => {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount DECIMAL(10,2) NOT NULL,
      currency VARCHAR(3) DEFAULT 'INR',
      category VARCHAR(50),
      description TEXT,
      merchant VARCHAR(100),
      original_input TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  ).run();
};

export const createExpense = (expense: Omit<Expense, "id" | "created_at">) => {
  const stmt = db.prepare(`
    INSERT INTO expenses (amount, currency, category, description, merchant, original_input)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    expense.amount,
    expense.currency,
    expense.category,
    expense.description,
    expense.merchant,
    expense.original_input,
  );
};

export const getAllExpenses = (): Expense[] => {
  return db
    .prepare("SELECT * FROM expenses ORDER BY created_at DESC")
    .all() as Expense[];
};

export const deleteExpense = (id: number) => {
  return db.prepare("DELETE FROM expenses WHERE id = ?").run(id).changes > 0;
};
