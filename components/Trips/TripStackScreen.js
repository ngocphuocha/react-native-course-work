import React from "react";
import TripsScreen from "./TripsScreen.js";
import AddTripScreen from "./AddTripScreen.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DraculaTheme } from "../../styles/global";

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
      <TripStack.Screen name="My Trips" component={TripsScreen} />
      <TripStack.Screen
        name="AddTrips"
        component={AddTripScreen}
        options={{ title: "Add New Trip" }}
      />
    </TripStack.Navigator>
  );
};

export default TripStackScreen;
