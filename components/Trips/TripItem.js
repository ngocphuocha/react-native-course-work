import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DraculaTheme } from "../../styles/global.js";
const TripItem = ({ item }) => {
  const navigation = useNavigation();

  const goToUpdateScreen = () => {
    navigation.navigate("UpdateTripScreen", {
      item: item,
    });
  };
  return (
    <TouchableOpacity onPress={goToUpdateScreen}>
      <View style={styles.itemContainer}>
        <View style={styles.childItemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={[styles.itemText, styles.destinationText]}>
            {item.destination}
          </Text>
        </View>

        <View style={styles.childItemContainer}>
          <Text style={styles.itemText}>{item.date}</Text>
          <Text style={styles.itemText}>
            Require Assessment: {item.require}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    // backgroundColor: "#ff79c6",
    borderStyle: "dashed",
    borderRadius: 8,
    borderColor: "#ff79c6",
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 75,
  },
  childItemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  destinationText: {
    color: DraculaTheme.redColor,
  },
});
export default TripItem;
