import React, { useContext } from "react";
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
import TripContext from "../context/trip/tripContext.js";

const AddTripScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState("Yes");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const tripContext = useContext(TripContext);
  const { addTrip } = tripContext;

  const addNewTrip = async () => {
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
      await addTrip(trip);
      // Navigate back to list all trips screen
      await navigation.navigate("TripsScreen");
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
        <FlatButton title="Add" onPress={addNewTrip} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTripScreen;
