import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

//importamos Stack
import NewsStack from "./NewsStack";
import FavoriteStack from "./FavoriteStack";
import SectionStack from "./SectionStack";


const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="news"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#7fbf3f",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="news"
          component={NewsStack}
          options={{ title: "Hoy" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoriteStack}
          options={{ title: "Favoritos" }}
        />

        <Tab.Screen
          name="sections"
          component={SectionStack}
          options={{ title: "Secciones" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "news":
      iconName = "newspaper";
      break;
      case "favorites":
      iconName = "star-outline";
      break;
      case "sections":
      iconName = "blur";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={33} color={color} />
  );
}
