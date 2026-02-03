import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
  StyleSheet,
} from "react-native";
import { fetchExpenses, addExpense, deleteExpense } from "../services/api";
import { Expense } from "../types";
import { ExpenseInput } from "../components/ExpenseInput";
import { ExpenseCard } from "../components/ExpenseCard";

export default function ExpenseTrackerScreen() {
  const [input, setInput] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<Expense | null>(null);

  const loadData = async () => {
    try {
      const res = await fetchExpenses();
      if (res.success) setExpenses(res.expenses);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const handleAdd = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    try {
      const res = await addExpense(input);
      if (res.success) {
        setExpenses([res.expense, ...expenses]);
        setSuccessData(res.expense);
        setInput("");
        setTimeout(() => setSuccessData(null), 3000);
      } else {
        Alert.alert("Error", res.error || "Could not parse expense.");
      }
    } catch (err) {
      Alert.alert("Network Error", "Check your backend IP and connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteExpense(id);
      if (res.success) {
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      Alert.alert("Error", "Delete failed.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Expense Tracker</Text>
        <Text style={styles.subtitle}>Add expenses in plain English</Text>
      </View>

      <ExpenseInput
        input={input}
        setInput={setInput}
        onAdd={handleAdd}
        loading={loading}
      />

      {!!successData && (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>✅ Expense Added</Text>
          <Text style={styles.successText}>
            {successData.merchant ? `${successData.merchant}: ` : ""}₹
            {successData.amount} for {successData.category}
          </Text>
        </View>
      )}

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            colors={["#4CAF50"]}
          />
        }
        renderItem={({ item }) => (
          <ExpenseCard item={item} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No expenses yet. Add your first one!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: "800", color: "#d72323" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
  successCard: {
    margin: 20,
    padding: 15,
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  successTitle: { color: "#2E7D32", fontWeight: "bold", fontSize: 16 },
  successText: { color: "#4CAF50", marginTop: 4 },
  listContainer: { padding: 20 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
    fontSize: 16,
  },
});
