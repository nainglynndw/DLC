import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const layout = Dimensions.get("window");

const TeacherDashBoard = (props) => {
  const data = props.route.params;

  const Button = (props) => {
    return (
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: props.color }]}
        onPress={props.onPress}
      >
        <MaterialCommunityIcons name={props.iconName} size={24} color="black" />
        <Text style={styles.btnText}>{props.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/bg.jpg")}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={styles.btnContainer}>
        <Button
          iconName="account"
          title="My Profile"
          color="#c6c904"
          onPress={() => {
            props.navigation.navigate("Profile", data);
          }}
        />
        <Button
          iconName="plus-circle"
          title="Add Students"
          color="#3064ff"
          onPress={() => {
            props.navigation.navigate("AddStudent", data);
          }}
        />
        <Button
          iconName="account-group"
          title="My Class"
          color="#ff3333"
          onPress={() => {
            props.navigation.navigate("MyStudents", data);
          }}
        />
        <Button
          iconName="logout"
          title="Logout"
          color="#56fc90"
          onPress={() => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: "Loading" }],
            });
          }}
        />
      </View>
      <Image
        resizeMode="contain"
        style={styles.img}
        source={require("../assets/images/profile.png")}
      />
      <StatusBar hidden />
    </View>
  );
};

export default TeacherDashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: layout.width,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "70%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btn: {
    width: "30%",
    backgroundColor: "#c6c904",
    margin: "10%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
  },
  img: {
    width: layout.width / 5,
    height: layout.width / 5,
    position: "absolute",
  },
  btnText: {
    marginTop: 5,
    fontWeight: "bold",
  },
});
