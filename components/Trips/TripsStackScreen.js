import React from "react";
import TripsScreen from "./TripsScreen.js";
import AddTripScreen from "./AddTripScreen.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DraculaTheme } from "../../styles/global";
import UpdateTripScreen from "./UpdateTripScreen.js";

const TripStackScreen = () => {
  const TripStack = createNativeStackNavigator();

  return (
    <TripStack.Navigator
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
      {/* List all trips screen */}
      <TripStack.Screen name="TripsScreen" component={TripsScreen} />

      {/* Add new trip screen */}
      <TripStack.Screen
        name="AddTripsScreen"
        component={AddTripScreen}
        options={{ title: "Add New Trip" }}
      />

      {/* Update the trip screen */}
      <TripStack.Screen
        name="UpdateTripScreen"
        component={UpdateTripScreen}
        options={({ route }) => ({ title: route.params.item.name })}
      />
    </TripStack.Navigator>
  );
};

export default TripStackScreen;
