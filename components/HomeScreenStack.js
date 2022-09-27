import React from "react";
import { Text, View } from "react-native";
import { DraculaTheme, GlobalStyles } from "../styles/global.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";

const HomeScreenStack = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: DraculaTheme.backgroundColor,
        },
        headerTintColor: DraculaTheme.pinkColor,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeScreenStack;
