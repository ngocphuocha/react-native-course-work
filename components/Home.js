import { Text, View } from "react-native";
import { GlobalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    initTripsArray();
  }, []);

  const initTripsArray = async () => {
    const trips = await AsyncStorage.getItem("trips");

    if (trips == null) {
      try {
        await AsyncStorage.setItem("trips", JSON.stringify([]));
      } catch (error) {
        console.log(error);
      }
    }
    //  else {
    //   console.log("Trip is exists in Async Storage");
    // }
  };
  return (
    <View style={[GlobalStyles.container, GlobalStyles.centerItem]}>
      <Text>Travel Manager</Text>
    </View>
  );
};

export default Home;
