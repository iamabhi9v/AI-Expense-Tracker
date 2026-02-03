import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface ExpenseInputProps {
  input: string;
  setInput: (text: string) => void;
  onAdd: () => void;
  loading: boolean;
}

export const ExpenseInput = ({
  input,
  setInput,
  onAdd,
  loading,
}: ExpenseInputProps) => (
  <View style={styles.inputSection}>
    <TextInput
      value={input}
      onChangeText={setInput}
      placeholder="e.g., Spent 850 on lunch at Taj Hotel"
      style={styles.input}
      multiline
    />
    <TouchableOpacity
      onPress={onAdd}
      disabled={!!loading || !input.trim()}
      style={[
        styles.button,
        (!!loading || !input.trim()) && styles.buttonDisabled,
      ]}
    >
      {!!loading ? (
        <ActivityIndicator animating={true} color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Add Expense</Text>
      )}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  inputSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#A5D6A7" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
