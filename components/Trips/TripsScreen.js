import React, { useContext, useCallback } from "react";
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { GlobalStyles } from "../../styles/global.js";
import FlatButton from "../Buttons/FlatButton";
import TripItem from "./TripItem.js";
import TripContext from "../context/trip/tripContext.js";
import { useFocusEffect } from "@react-navigation/native";
import SearchTripForm from "./SearchTripForm.js";
import DeleteAllTrip from "./DeleteAllTrip.js";
const TripsScreen = ({ navigation }) => {
  const tripContext = useContext(TripContext);
  const { tripsData, getTrips, searchTripItem, deleteAllTrip } = tripContext;

  useFocusEffect(
    useCallback(() => {
      getTrips();
    }, [])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <DeleteAllTrip removeAllTrip={removeAllTrip} />,
    });
  }, [navigation]);

  // Render the trip
  const renderTrip = ({ item }) => <TripItem item={item} />;

  // Remove all trips from async storage
  const removeAllTrip = () => {
    Alert.alert("Delete All Trip", "Are you sure delete all the trips?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: deleteAllTrip },
    ]);
  };
  return (
    <View style={GlobalStyles.container}>
      <FlatButton
        title="Add Trip"
        onPress={() => navigation.navigate("AddTripsScreen")}
      />
      {/* Search trip form */}
      <SearchTripForm searchTrips={searchTripItem} />

      <View style={styles.content}>
        {/* List of trip */}
        <View style={styles.list}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
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
