import React from "react";
import TripsScreen from "./TripsScreen.js";
import AddTripScreen from "./AddTripScreen.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DraculaTheme } from "../../styles/global";
import DeleteAllTrip from "./DeleteAllTrip.js";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TripStackScreen = () => {
  const TripStack = createNativeStackNavigator();

  const removeAllTrip = async () => {
    try {
      Alert.alert("Delete All Trip", "Are you sure delete all the trips?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel delete all trip"),
          style: "cancel",
        },
        { text: "OK", onPress: await AsyncStorage.removeItem("trips") },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
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
      <TripStack.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          headerRight: () => <DeleteAllTrip removeAllTrip={removeAllTrip} />,
        }}
      />
      <TripStack.Screen
        name="AddTrips"
        component={AddTripScreen}
        options={{ title: "Add New Trip" }}
      />
    </TripStack.Navigator>
  );
};

export default TripStackScreen;
