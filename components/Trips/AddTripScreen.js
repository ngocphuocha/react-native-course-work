import React from "react";
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

const AddTripScreen = () => {
  const [checked, setChecked] = React.useState("Yes");

  const addTrip = () => {
    console.log("OK");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={GlobalStyles.container}>
        <Text>{checked}</Text>
        <TextInput style={GlobalStyles.inputText} placeholder="Name of Trip" />
        <TextInput style={GlobalStyles.inputText} placeholder="Destination" />
        <TextInput style={GlobalStyles.inputText} placeholder="Date of trip" />
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
        <TextInput style={GlobalStyles.inputText} placeholder="Description" />
        {/*  Submit button*/}
        <FlatButton title="Add" onPress={addTrip} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});
export default AddTripScreen;
