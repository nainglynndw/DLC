import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import MCQ from "./Screens/MCQ";
import Tracing from "./Screens/Tracing";
import Train from "./Screens/Train";
import QuizEnd from "./Screens/QuizEnd";
import Loading from "./Screens/Loading";
import GesturePath from "./Screens/GesturePath";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
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
        <Stack.Screen name="QuizEnd" component={QuizEnd} />
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="GesturePath" component={GesturePath} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
