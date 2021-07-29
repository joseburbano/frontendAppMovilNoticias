import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import News from "../screens/News";

const Stack = createStackNavigator();

export default function NewssStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="news"
        component={News}
        options={{ title: "Noticias de Hoy" }}
      />
    </Stack.Navigator>
  );
}
