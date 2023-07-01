import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ActivityStack from "../Stacks/ActivityStack.js";
import HomeStack from "../Stacks/HomeStack.js";

const FooterTab = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        ></Screen>
        <Screen
          name="ActivityStack"
          component={ActivityStack}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="menu" color={color} size={26} />
            ),
          }}
        ></Screen>
      </Navigator>
    </NavigationContainer>
  );
};

export default FooterTab;
