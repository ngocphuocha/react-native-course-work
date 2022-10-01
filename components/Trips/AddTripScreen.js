import React, { useCallback, useContext, useState } from "react";
import "react-native-get-random-values";
import { v4 as randomId } from "uuid";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import { DraculaTheme, GlobalStyles } from "../../styles/global.js";
import { RadioButton } from "react-native-paper";
import FlatButton from "../Buttons/FlatButton";
import TripContext from "../context/trip/tripContext.js";
import { useFocusEffect } from "@react-navigation/native";

const AddTripScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState("Yes");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    name: "Required",
    destination: "Required",
    date: "Required",
    description: "Required",
  });
  const [isValid, setIsValid] = useState(false);

  const tripContext = useContext(TripContext);
  const { addTrip } = tripContext;

  useFocusEffect(
    useCallback(() => {
      checkValidForm();
    }, [])
  );
  const addNewTrip = async () => {
    checkValidForm();

    if (isValid === false) {
      Alert.alert("Invalid input", "You need to fill all required fields!", [
        {
          text: "Understood",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
      return;
    }

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

  const checkValidForm = () => {
    // Default state
    setIsValid(true);

    if (error.name.trim() !== "") {
      setIsValid(false);
    }
    if (error.destination.trim() !== "") {
      setIsValid(false);
    }
    if (error.date.trim() !== "") {
      setIsValid(false);
    }
    if (error.description.trim() !== "") {
      setIsValid(false);
    }

    // console.log(isValid);
  };

  const onChangeName = (value) => {
    setName(value);
    const newError = { ...error };

    if (value.trim().length === 0) {
      newError.name = "Required";
    } else {
      newError.name = "";
    }

    setError(newError);
    checkValidForm();
  };

  const onChangeDestination = (value) => {
    setDestination(value.trim());
    const newError = { ...error };

    if (value.trim().length === 0) {
      newError.destination = "Required";
    } else {
      newError.destination = "";
    }

    setError(newError);
    checkValidForm();
  };

  const onChangeDate = (value) => {
    setDate(value);
    const newError = { ...error };
    // Reference https://www.programiz.com/javascript/regex
    var regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    const result = regex.test(value);
    // console.log("Result: ", result);
    if (value.trim().length === 0) {
      newError.date = "Required";
    } else if (result === false) {
      newError.date = "Date must be format DD/MM/YYYY";
    } else {
      newError.date = "";
    }

    setError(newError);
    checkValidForm();
  };

  const onChangeDescription = (value) => {
    setDescription(value);
    const newError = { ...error };

    if (value.trim().length === 0) {
      newError.description = "Required";
    } else {
      newError.description = "";
    }
    setError(newError);
    checkValidForm();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={GlobalStyles.container}>
        <TextInput
          style={GlobalStyles.inputText}
          value={name}
          onChangeText={(value) => onChangeName(value)}
          placeholder="Name of Trip"
        />
        {error.name.length !== 0 && (
          <Text style={{ color: DraculaTheme.redColor }}>{error.name}</Text>
        )}

        <Text></Text>
        <TextInput
          style={GlobalStyles.inputText}
          value={destination}
          onChangeText={onChangeDestination}
          placeholder="Destination"
        />
        {error.destination != undefined && (
          <Text style={{ color: DraculaTheme.redColor }}>
            {error.destination}
          </Text>
        )}

        <TextInput
          onChangeText={onChangeDate}
          value={date}
          style={GlobalStyles.inputText}
          placeholder="Date of trip (DD/MM/YYYY)"
        />
        {error.date != undefined && (
          <Text style={{ color: DraculaTheme.redColor }}>{error.date}</Text>
        )}

        <Text
          style={{
            color: DraculaTheme.pinkColor,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
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
          onChangeText={onChangeDescription}
          style={GlobalStyles.inputText}
          placeholder="Description"
        />
        {error.description != undefined && (
          <Text style={{ color: DraculaTheme.redColor }}>
            {error.description}
          </Text>
        )}

        {/*  Submit button*/}
        <View style={{ marginVertical: 10 }}>
          <FlatButton title="Add" onPress={addNewTrip} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTripScreen;
