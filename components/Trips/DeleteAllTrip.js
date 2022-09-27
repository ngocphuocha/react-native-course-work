import React from "react";
import { TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DraculaTheme } from "../../styles/global.js";

const DeleteAllTrip = ({ removeAllTrip }) => {
  return (
    <TouchableOpacity onPress={removeAllTrip}>
      <View>
        <MaterialCommunityIcons
          name="delete"
          color={DraculaTheme.redColor}
          size={26}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DeleteAllTrip;
