import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { GlobalStyles } from "../../styles/global.js";
import { DraculaTheme } from "../../styles/global.js";
import { RadioButton } from "react-native-paper";
import FlatButton from "../Buttons/FlatButton";
import { useFocusEffect } from "@react-navigation/native";
import TripContext from "../context/trip/tripContext.js";
import DeleteTripButtonHeader from "./DeleteTripButtonHeader.js";
const UpdateTripScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [name, setName] = useState(item.name);
  const [checked, setChecked] = useState(item.require);
  const [destination, setDestination] = useState(item.destination);
  const [date, setDate] = useState(item.date);
  const [description, setDescription] = useState(item.destination);
  const [errorInput, setErrorInput] = useState({});

  useFocusEffect(
    React.useCallback(() => {
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
        style: "cancel",
      },
      { text: "OK", onPress: () => removeTrip() },
    ]);
  };

  const checkValidForm = () => {
    // default state error
    setErrorInput({});
    let valid = true;

    if (name.trim().length == 0) {
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
        delete cloneObj["name"];

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
        delete cloneObj["destination"];

        return cloneObj;
      });
    }

    // Reference https://www.programiz.com/javascript/regex
    var regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
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
        delete cloneObj["date"];

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
        delete cloneObj["description"];

        return cloneObj;
      });
    }

    if (valid) {
      updateTrip();
    } else {
      Alert.alert("Invalid input", "You need to fill all required fields!", [
        {
          text: "Understood",
          style: "cancel",
        },
      ]);
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={GlobalStyles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ color: DraculaTheme.pinkColor }}>Update Trip</Text>
          {/* <Text>{JSON.stringify(errorInput, null, 4)}</Text> */}
        </View>

        <TextInput
          style={GlobalStyles.inputText}
          value={name}
          onChangeText={onChangeName}
          placeholder="Name of Trip"
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
          style={GlobalStyles.inputText}
          placeholder="Description"
        />
        {errorInput.description && (
          <Text style={{ color: DraculaTheme.redColor }}>
            {errorInput.description}
          </Text>
        )}

        <View style={{ marginVertical: 10 }}>
          {/*  Submit button*/}
          <FlatButton title="Update" onPress={checkValidForm} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
  },
});
export default UpdateTripScreen;
