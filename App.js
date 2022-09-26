import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        /* 1. Navigate to the Details route with params */
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          })
        }
      />
    </View>
  );
}

function DetailsScreen({ route, navigation: { setParams } }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;

  const handleSetParamRoute = () => {
    setParams({
      itemId: 10,
      otherParam: "Bo may test OK?",
    });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>Other param: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again ..."
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
            otherParam: `Other param: ${Math.floor(Math.random() * 100)}`,
          })
        }
      />
      <View style={{ marginTop: 20 }}></View>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Set param again" onPress={handleSetParamRoute} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "OverView" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ itemId: 1000, otherParam: "this is init param" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
