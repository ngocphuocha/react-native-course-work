import React from "react";
import { Text, View, Button } from "react-native";
import { GlobalStyles } from "../../styles/global.js";
import FlatButton from "../Buttons/FlatButton";

const TripsScreen = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <Text>All trips</Text>
      <FlatButton
        title="Add Trip"
        onPress={() => navigation.navigate("AddTrips")}
      />
    </View>
  );
};

export default TripsScreen;
