const API_BASE_URL = 'http://192.168.1.9:3000/api';

export const fetchExpenses = async () => {
  const response = await fetch(`${API_BASE_URL}/expenses`);
  return await response.json();
};

export const addExpense = async (input: string) => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });
  return await response.json();
};

export const deleteExpense = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};
