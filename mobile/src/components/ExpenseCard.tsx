import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Expense } from "../types";

const CATEGORY_EMOJIS: Record<string, string> = {
  "Food & Dining": "🍔",
  Transport: "🚗",
  Shopping: "🛒",
  Entertainment: "📺",
  "Bills & Utilities": "📄",
  Health: "💊",
  Travel: "✈️",
  Other: "📦",
};

interface ExpenseCardProps {
  item: Expense;
  onDelete: (id: number) => void;
}

export const ExpenseCard = ({ item, onDelete }: ExpenseCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardLeft}>
      <Text style={styles.emoji}>{CATEGORY_EMOJIS[item.category] || "📦"}</Text>
      <View>
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.timeAgo}>
          {formatDistanceToNow(new Date(item.created_at))} ago
        </Text>
      </View>
    </View>
    <View style={styles.cardRight}>
      <Text style={styles.amount}>₹{item.amount}</Text>
      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={styles.deleteBtn}
      >
        <Feather name="trash-2" size={18} color="#FF5252" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardLeft: { flexDirection: "row", flex: 1 },
  emoji: { fontSize: 24, marginRight: 12 },
  categoryName: { fontSize: 16, fontWeight: "700", color: "#1a1a1a" },
  description: { fontSize: 14, color: "#666", marginVertical: 2 },
  timeAgo: { fontSize: 12, color: "#999" },
  cardRight: { alignItems: "flex-end", justifyContent: "space-between" },
  amount: { fontSize: 18, fontWeight: "800", color: "#1a1a1a" },
  deleteBtn: { padding: 4 },
});
