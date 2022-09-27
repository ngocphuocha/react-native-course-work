import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DraculaTheme } from "../../styles/global";

const FlatButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: DraculaTheme.backgroundColor,
  },
  buttonText: {
    color: DraculaTheme.pinkColor,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
export default FlatButton;
