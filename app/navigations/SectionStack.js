import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Sections from "../screens/Sections";

//los Stacl el para resaltar el menu en cada una de las navegaciones
const Stack = createStackNavigator();

export default function SectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="sections"
        component={Sections}
        options={{ title: "Menú" }}
      />
    </Stack.Navigator>
  );
}