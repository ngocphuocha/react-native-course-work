import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },

  inputText: {
    borderRadius: 5,
    marginVertical: 12,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  radioContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 12,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  centerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export const DraculaTheme = {
  backgroundColor: "#fff",
  redColor: "#ff5555",
  pinkColor: "#ff79c6",
};
