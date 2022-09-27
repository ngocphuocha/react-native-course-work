import React from "react";
import "react-native-get-random-values";
import { v4 as randomId } from "uuid";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { DraculaTheme } from "../../styles/global.js";
import { GlobalStyles } from "../../styles/global.js";
import { RadioButton } from "react-native-paper";
import FlatButton from "../Buttons/FlatButton";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddTripScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState("Yes");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const addTrip = async () => {
    try {
      // retrieve the trip input
      const trip = {
        id: randomId(),
        name,
        destination,
        date,
        require: checked,
        description,
      };

      const trips = JSON.parse(await AsyncStorage.getItem("trips"));

      if (trips == null) {
        await AsyncStorage.setItem("trips", JSON.stringify([]));
      }

      const newTrips = [...trips, trip];
      console.log("OKKKK");
      // await AsyncStorage.removeItem("trips");
      await AsyncStorage.setItem("trips", JSON.stringify(newTrips));
      await navigation.navigate("Trips");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={GlobalStyles.container}>
        <Text>{checked}</Text>
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
        <FlatButton title="Add" onPress={addTrip} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});
export default AddTripScreen;
