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

const AddTripScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState("Yes");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorInput, setErrorInput] = useState({});

  const tripContext = useContext(TripContext);
  const { addTrip } = tripContext;

  const addNewTrip = async () => {
    try {
      // retrieve the trip input
      const tripItemInput = {
        id: randomId(),
        name: name.trim().toLowerCase(),
        destination: destination.trim().toLowerCase(),
        date: date.trim().toLowerCase(),
        require: checked.trim().toLowerCase(),
        description: destination.trim().toLowerCase(),
      };
      // console.log(tripItemInput);
      // return;

      await addTrip(tripItemInput);
      // Navigate back to list all trips screen
      await navigation.navigate("TripsScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeName = (value) => {
    setName(value);
  };

  const onChangeDestination = (value) => {
    setDestination(value);
  };

  const onChangeDate = (value) => {
    setDate(value);
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const checkValidForm = () => {
    // Dismiss the keyboard first
    Keyboard.dismiss();

    // set default state error
    setErrorInput({});
    // set flag valid
    let valid = true;

    if (name.trim().length === 0) {
      setErrorInput((preState) => ({
        ...preState,
        name: "Required",
      }));

      valid = false;
    } else {
      setErrorInput((preState) => {
        // create copy of state object
        const cloneObj = { ...preState };
        // remove salary key from object
        delete cloneObj.name;

        return cloneObj;
      });
    }

    if (destination.trim().length === 0) {
      setErrorInput((preState) => ({
        ...preState,
        destination: "Required",
      }));

      valid = false;
    } else {
      setErrorInput((preState) => {
        // create copy of state object
        const cloneObj = { ...preState };
        // remove salary key from object
        delete cloneObj.destination;

        return cloneObj;
      });
    }

    // Reference https://www.programiz.com/javascript/regex
    const regex =
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    const result = regex.test(date);

    if (date.trim().length === 0) {
      setErrorInput((preState) => ({
        ...preState,
        date: "Required",
      }));

      valid = false;
    } else if (result === false) {
      setErrorInput((preState) => ({
        ...preState,
        date: "Date must be format DD/MM/YYYY",
      }));

      valid = false;
    } else {
      setErrorInput((preState) => {
        // create copy of state object
        const cloneObj = { ...preState };
        // remove salary key from object
        delete cloneObj.date;

        return cloneObj;
      });
    }

    if (description.trim().length === 0) {
      setErrorInput((preState) => ({
        ...preState,
        description: "Required",
      }));

      valid = false;
    } else {
      setErrorInput((preState) => {
        // create copy of state object
        const cloneObj = { ...preState };
        // remove salary key from object
        delete cloneObj.description;

        return cloneObj;
      });
    }

    if (!valid) {
      Alert.alert("Invalid input", "You need to fill all required fields!", [
        {
          text: "Understood",
          style: "cancel",
        },
      ]);
    } else {
      addNewTrip();
    }
  };

  const handleRemoveError = (value, key) => {
    console.log(key);
    setErrorInput((presState) => ({ ...presState, [key]: undefined }));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={GlobalStyles.container}>
        <TextInput
          style={GlobalStyles.inputText}
          value={name}
          onChangeText={onChangeName}
          placeholder="Name of Trip"
          onFocus={(value) => {
            handleRemoveError(value, "name");
          }}
        />
        {errorInput.name && (
          <Text style={{ color: DraculaTheme.redColor }}>
            {errorInput.name}
          </Text>
        )}

        <TextInput
          style={GlobalStyles.inputText}
          value={destination}
          onChangeText={onChangeDestination}
          onFocus={(value) => {
            handleRemoveError(value, "destination");
          }}
          placeholder="Destination"
        />
        {errorInput.destination && (
          <Text style={{ color: DraculaTheme.redColor }}>
            {errorInput.destination}
          </Text>
        )}

        <TextInput
          onChangeText={onChangeDate}
          value={date}
          onFocus={(value) => {
            handleRemoveError(value, "date");
          }}
          style={GlobalStyles.inputText}
          placeholder="Date of trip (DD/MM/YYYY)"
        />
        {errorInput.date && (
          <Text style={{ color: DraculaTheme.redColor }}>
            {errorInput.date}
          </Text>
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
          onFocus={(value) => {
            handleRemoveError(value, "description");
          }}
          style={GlobalStyles.inputText}
          placeholder="Description"
        />
        {errorInput.description && (
          <Text style={{ color: DraculaTheme.redColor }}>
            {errorInput.description}
          </Text>
        )}

        {/*  Submit button*/}
        <View style={{ marginVertical: 10 }}>
          <FlatButton title="Add" onPress={checkValidForm} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddTripScreen;
