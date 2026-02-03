import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExpenseTrackerScreen from "./src/screens/ExpenseTrackerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tracker"
          component={ExpenseTrackerScreen}
          options={{ title: "AI Expense Tracker" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
