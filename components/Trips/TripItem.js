import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const TripItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Name {item.id}</Text>
      {/*<Text style={styles.itemText}>Name {item.name}</Text>*/}
      <MaterialIcons name="delete" size={18} />
      {/*<Text style={styles.itemText}>Name {item.destination}</Text>*/}
    </View>
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
    justifyContent: "space-between"
  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default TripItem;
