import React, { useContext, useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../styles/global.js";
import FlatButton from "../Buttons/FlatButton";
import TripItem from "./TripItem.js";
import TripContext from "../context/trip/tripContext.js";
import { useFocusEffect } from "@react-navigation/native";
import SearchTripForm from "./SearchTripForm.js";
const TripsScreen = ({ navigation }) => {
  const tripContext = useContext(TripContext);
  const { tripsData, getTrips, searchTripItem } = tripContext;
  const [trips, setTrips] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getTrips(); // get trips data from context
      setTrips(tripsData);
      console.log(trips);
    }, [])
  );

  // Render the trip
  const renderTrip = ({ item }) => <TripItem item={item} />;

  const searchTrips = (query) => {
    const result = searchTripItem(query);
    setTrips(result);
  };
  return (
    <View style={GlobalStyles.container}>
      <FlatButton
        title="Add Trip"
        onPress={() => navigation.navigate("AddTripsScreen")}
      />
      {/* Search trip form */}
      <SearchTripForm searchTrips={searchTrips} />

      <View style={styles.content}>
        {/* List of trip */}
        <View style={styles.list}>
          <FlatList
            data={trips}
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
