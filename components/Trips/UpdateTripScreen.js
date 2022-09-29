import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { GlobalStyles } from "../../styles/global.js";
import { DraculaTheme } from "../../styles/global.js";
import { RadioButton } from "react-native-paper";
import FlatButton from "../Buttons/FlatButton";
import { useFocusEffect } from "@react-navigation/native";
import TripContext from "../context/trip/tripContext.js";
import DeleteTripButtonHeader from "./DeleteTripButtonHeader.js";
const UpdateTripScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [name, setName] = useState("");
  const [checked, setChecked] = useState("Yes");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setName(item.name);
      setChecked(item.require);
      setDestination(item.destination);
      setDate(item.date);
      setDescription(item.description);

      // Set button delete trip to header
      navigation.setOptions({
        headerRight: () => (
          <DeleteTripButtonHeader removeTrip={confirmDeleteTrip} />
        ),
      });
    }, [])
  );
  const tripContext = useContext(TripContext);
  const { updateTripItem, deleteTripItem } = tripContext;

  const updateTrip = async () => {
    try {
      const tripItemInput = {
        id: item.id,
        name,
        destination,
        date,
        require: checked,
        description,
      };
      await updateTripItem(tripItemInput);
      navigation.navigate("TripsScreen");
    } catch (error) {
      console.log(error);
    }
  };
  const removeTrip = async () => {
    await deleteTripItem(item);
    navigation.navigate("TripsScreen");
  };

  const confirmDeleteTrip = () => {
    Alert.alert("Delete Trip", "Are you sure delete this trip?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel delete the trip"),
        style: "cancel",
      },
      { text: "OK", onPress: () => removeTrip() },
    ]);
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ color: DraculaTheme.pinkColor }}>Update Trip</Text>
      </View>

      <TextInput
        style={GlobalStyles.inputText}
        value={name}
        onChangeText={setName}
        placeholder="Name of Trip"
      />
      <TextInput
        style={GlobalStyles.inputText}
        value={destination}
        onChangeText={setDestination}
        placeholder="Destination"
      />
      <TextInput
        onChangeText={setDate}
        value={date}
        style={GlobalStyles.inputText}
        placeholder="Date of trip"
      />
      <Text style={{ padding: 10, color: DraculaTheme.pinkColor }}>
        Require Assessment
      </Text>
      <View style={GlobalStyles.radioContainer}>
        <View style={GlobalStyles.radioButton}>
          <Text>Yes</Text>
          <RadioButton
            value="Yes"
            status={checked === "Yes" ? "checked" : "unchecked"}
            onPress={() => setChecked("Yes")}
          />
        </View>
        <View style={GlobalStyles.radioButton}>
          <Text>No</Text>
          <RadioButton
            value="No"
            status={checked === "No" ? "checked" : "unchecked"}
            onPress={() => setChecked("No")}
          />
        </View>
      </View>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={GlobalStyles.inputText}
        placeholder="Description"
      />

      {/*  Submit button*/}
      <FlatButton title="Update" onPress={updateTrip} />
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
  },
});
export default UpdateTripScreen;
