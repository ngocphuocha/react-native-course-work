import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
        <Text style={styles.itemText}>{item.name}</Text>
        {/*<Text style={styles.itemText}>Name {item.name}</Text>*/}
        <MaterialIcons name="delete" size={18} />
        {/*<Text style={styles.itemText}>Name {item.destination}</Text>*/}
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
  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default TripItem;
