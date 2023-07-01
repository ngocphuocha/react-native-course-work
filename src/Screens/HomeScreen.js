import { Text, View } from "react-native";
import { GlobalStyles } from "../../styles/global";

const HomeScreen = () => {
  return (
    <View style={[GlobalStyles.container, GlobalStyles.centerItem]}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;
