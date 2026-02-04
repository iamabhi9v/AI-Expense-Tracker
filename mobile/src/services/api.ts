// Updated to include the '/api' prefix required by your backend
const API_BASE_URL = "https://earthshaking-ridiculous-katia.ngrok-free.dev/api";

export const fetchExpenses = async () => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    cache: 'no-store' // This prevents the 304 and forces a fresh 200 OK
  });
  return await response.json();
};

export const addExpense = async (input: string) => {
  // Now calls https://.../api/expenses
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });
  if (!response.ok) throw new Error("Failed to add expense");
  return await response.json();
};

export const deleteExpense = async (id: number) => {
  // Now calls https://.../api/expenses/${id}
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete expense");
  return await response.json();
};
