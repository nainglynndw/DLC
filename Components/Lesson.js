import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Lesson = (props) => {
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <TouchableOpacity
      style={styles.btnHeart}
      onPress={() => {
        props.onPress;
      }}
    >
      <LottieView
        resizeMode="cover"
        autoPlay={true}
        loop
        style={{
          width: 100,
          height: 100,
        }}
        colorFilters={[
          {
            keypath: "Layer 1",
            color: getRandomColor(),
          },
        ]}
        source={require("../assets/Animation/heart.json")}
      />
      <Text style={styles.btnText}>သင်ခန်းစာ - {props.name}</Text>
    </TouchableOpacity>
  );
};
export default Lesson;

const styles = StyleSheet.create({
  btnHeart: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    elevation: 8,
    borderRadius: 10,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "green",
  },
});
