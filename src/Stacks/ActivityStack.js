import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../Screens/HomeScreen.js";
import { Icon } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
import { Text } from "react-native";
import ActivityScreen from "../Screens/ActivityScreen.js";

const ActivityStack = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Screen
        name="Home"
        component={ActivityScreen}
        options={{
          title: "",
          headerLeft: () => (
            <>
              <Avatar
                size={32}
                rounded
                source={{
                  uri: "https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/353612991_3555801294744845_1608374516843132561_n.jpg?_nc_cat=105&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=YvirYD8BZnEAX9Y1gtE&_nc_ht=scontent.fdad3-6.fna&oh=00_AfDHneNifWwh0Im3S0_L-StIHpyEiGUlKnl6JcNTnTuL2Q&oe=64A546D0",
                }}
              />
              <Text style={{ paddingLeft: 10 }}>Nguyễn Thế Quý</Text>
            </>
          ),
          headerRight: () => <Icon name="settings" color="#303F9F" />,
        }}
      />
    </Navigator>
  );
};

export default ActivityStack;
