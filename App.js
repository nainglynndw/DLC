import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import MCQ from "./Screens/MCQ";
import Tracing from "./Screens/Tracing";
import Train from "./Screens/Train";
import Loading from "./Screens/Loading";
import Matching from "./Screens/Matching";
import DnD from "./Screens/DragAndDrop";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Loading"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ unmountOnBlur: true }}
        />
        <Stack.Screen name="MCQ" component={MCQ} />
        <Stack.Screen name="Tracing" component={Tracing} />
        <Stack.Screen name="Train" component={Train} />
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Matching" component={Matching} />
        <Stack.Screen name="DnD" component={DnD} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
