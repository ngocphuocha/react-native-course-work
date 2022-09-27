import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../styles/global.js";
import FlatButton from "../Buttons/FlatButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TripItem from "./TripItem.js";
import { useFocusEffect } from '@react-navigation/native';

const TripsScreen = ({navigation}) => {
  const [trips, setTrips] = useState([
    {
      id: "1",
      name: "Tao test",
    },
    {
      id: "2",
      name: "Tao test 2",
    },
    {
      id: "3",
      name: "Tao test 2",
    },
    {
      id: "4",
      name: "Tao test 2",
    },
    {
      id: "5",
      name: "Tao test 2",
    },
    {
      id: "6",
      name: "Tao test 2",
    },
    {
      id: "7",
      name: "Tao test 2",
    },
  ]);

  useFocusEffect(React.useCallback(() => {
    getTrips();
  }, []));

  const getTrips = async () => {
    try {
      const tripsArray = await AsyncStorage.getItem("trips");
      // console.log(tripsArray);

      setTrips(JSON.parse(tripsArray));
      console.log("Trips: ", trips);
    } catch (error) {
      console.log(error);
    }
  };

  // Render the trip
  const renderTrip = ({item}) => <TripItem item={item}/>;

  return (
      <View style={GlobalStyles.container}>
        <FlatButton
            title="Add Trip"
            onPress={() => navigation.navigate("AddTrips")}
        />
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
