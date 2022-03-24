import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";

import { Canvas } from "@benjeau/react-native-draw";
import { Ionicons } from "@expo/vector-icons";

const d = "M 80 210 C 40 70, 240 70, 200 210   ";

const Tracing = (props) => {
  const canvasRef = useRef(null);

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          source={require("../assets/lesson_gif/1.ka_gyi.gif")}
          style={styles.lessonGif}
          resizeMode="contain"
          resizeMethod="scale"
        />
        <View style={styles.card}>
          <Canvas
            ref={canvasRef}
            width={(Dimensions.get("window").width * 50) / 100}
            height={(Dimensions.get("window").height * 80) / 100}
            color="red"
            thickness={20}
            opacity={0.6}
            style={{
              backgroundColor: "white",
              elevation: 8,
            }}
          />
          <View
            style={[
              styles.rowContainer,
              { justifyContent: "space-evenly", marginTop: 10 },
            ]}
          >
            <TouchableOpacity onPress={handleUndo}>
              <Ionicons name="arrow-undo" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="trash-bin" size={24} color="darkred" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "QuizEnd" }],
                });
              }}
            >
              <Ionicons
                name="md-checkmark-circle-sharp"
                size={24}
                color="green"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }}
            >
              <Ionicons name="home" size={24} color="#223c7d" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <StatusBar hidden />
    </View>
  );
};

export default Tracing;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lessonGif: {
    width: "45%",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
  },
});
