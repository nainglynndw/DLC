import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
const sound = new Audio.Sound();

const layout = Dimensions.get("window");

const QuizEnd = (props) => {
  const [show, setShow] = useState(false);
  const music = require("../assets/Music/effect/success.wav");

  const playSound = async () => {
    try {
      await sound.loadAsync(music);
      await sound.replayAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const stopSound = async () => {
    try {
      await sound.unloadAsync();
    } catch (error) {
      console.log("stop =" + error);
    }
  };

  useEffect(() => {
    playSound();

    return () => {
      stopSound();
    };
  }, []);

  setTimeout(() => {
    setShow(true);
  }, 2670);

  {
    return show ? (
      <View style={styles.container}>
        <LottieView
          autoPlay={true}
          loop
          style={styles.icon}
          source={require("../assets/Animation/success.json")}
        />
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={props.onPressHome}>
            <LottieView
              autoPlay={true}
              loop
              style={styles.icon}
              source={require("../assets/Animation/home.json")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onPressNext}>
            <LottieView
              autoPlay={true}
              loop
              style={styles.icon}
              source={require("../assets/Animation/forward.json")}
            />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <LottieView
          autoPlay={true}
          loop
          style={{ width: 120, height: 120 }}
          source={require("../assets/Animation/star.json")}
        />
      </View>
    );
  }
};

export default React.memo(QuizEnd);

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    height: layout.height,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    alignSelf: "center",
    backgroundColor: "#000000cf",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 120,
    height: 120,
    marginHorizontal: 30,
  },
});
