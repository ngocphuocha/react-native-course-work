import React, { useContext, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../styles/global.js";
import FlatButton from "../Buttons/FlatButton";
import TripItem from "./TripItem.js";
import TripContext from "../context/trip/tripContext.js";
import { useFocusEffect } from "@react-navigation/native";

const TripsScreen = ({ navigation }) => {
  const tripContext = useContext(TripContext);
  const { tripsData, getTrips } = tripContext;

  useFocusEffect(
    useCallback(() => {
      getTrips();
    }, [])
  );

  // Render the trip
  const renderTrip = ({ item }) => <TripItem item={item} />;

  return (
    <View style={GlobalStyles.container}>
      <FlatButton
        title="Add Trip"
        onPress={() => navigation.navigate("AddTripsScreen")}
      />
      <View style={styles.content}>
        {/* List of trip */}
        <View style={styles.list}>
          <FlatList
            data={tripsData}
            renderItem={renderTrip}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
export default TripsScreen;
