import { Button, Text, View, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

function HomeScreen({ route, navigation }) {
  /** Getting the params */

  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Create Post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

const CreatePostScreen = ({ navigation, route }) => {
  const [postText, setPostText] = useState("");

  const sendPropToHomeScreen = () => {
    navigation.navigate({
      name: "Home",
      params: {
        post: postText,
      },
      merge: false,
    });
  };
  return (
    <View style={{ padding: 30 }}>
      <TextInput
        style={{
          height: 50,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
        }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button title="Done" onPress={sendPropToHomeScreen} />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "OverView" }}
        />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
