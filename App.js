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
import TeacherDashBoard from "./Screens/TeacherDashBoard";
import Profile from "./Screens/Profile";
import MyStudents from "./Screens/MyStudents";
import AddStudent from "./Screens/AddStudent";
import EditStudent from "./Screens/EditStudent";
import IntroScreen from "./Screens/IntroScreen";
import RevisionChoice from "./QuestionTemplates/RevisionChoice";

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
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Matching" component={Matching} />
        <Stack.Screen name="DnD" component={DnD} />
        <Stack.Screen name="TeacherDashBoard" component={TeacherDashBoard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyStudents" component={MyStudents} />
        <Stack.Screen name="AddStudent" component={AddStudent} />
        <Stack.Screen name="EditStudent" component={EditStudent} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Revision" component={RevisionChoice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
