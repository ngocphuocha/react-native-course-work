import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenStack from "../HomeScreenStack.js";
import TripStackScreen from "../Trips/TripStackScreen.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="HomeStackScreen"
          component={HomeScreenStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Trips"
          component={TripStackScreen}
          options={{
            title: "Trip",
            tabBarLabel: "Trip",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="airplane" color={color} size={26} />
            ),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tab;
