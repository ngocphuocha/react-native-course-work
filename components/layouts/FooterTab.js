import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreenStack from "../HomeScreenStack.js";

const FooterTab = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="HomeStackScreen"
          component={HomeScreenStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        ></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default Tab;
