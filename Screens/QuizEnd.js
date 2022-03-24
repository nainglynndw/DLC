import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

import LottieView from "lottie-react-native";

const QuizEnd = (props) => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay={true}
        loop
        style={styles.icon}
        source={require("../assets/Animation/success.json")}
      />
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
        >
          <LottieView
            autoPlay={true}
            loop
            style={styles.icon}
            source={require("../assets/Animation/home.json")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Next");
          }}
        >
          <LottieView
            autoPlay={true}
            loop
            style={styles.icon}
            source={require("../assets/Animation/forward.json")}
          />
        </TouchableOpacity>
      </View>
      <StatusBar hidden />
    </View>
  );
};

export default QuizEnd;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 150,
    height: 150,
    backgroundColor: "#ffffff",
  },
});
