import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="conversao"
        options={{
          title: "Conversão",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="currency-usd" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="limite"
        options={{
          title: "Limite",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shield-check" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lucro"
        options={{
          title: "Lucro",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-multiple" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
