import { Text, View } from "react-native";
import { GlobalStyles } from "../../styles/global";

const ActivityScreen = () => {
  return (
    <View style={[GlobalStyles.container, GlobalStyles.centerItem]}>
      <Text>Activity Manager</Text>
    </View>
  );
};

export default ActivityScreen;
