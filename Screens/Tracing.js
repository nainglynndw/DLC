import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import QuizEnd from "./QuizEnd";
import { Canvas } from "@benjeau/react-native-draw";
import { Ionicons, Fontisto } from "@expo/vector-icons";

const Tracing = (props) => {
  const data = props.route.params;
  const canvasRef = useRef(null);
  const handleUndo = () => {
    canvasRef.current?.undo();
  };
  const handleClear = () => {
    canvasRef.current?.clear();
  };

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          source={data.data}
          style={styles.lessonGif}
          resizeMode="contain"
          resizeMethod="scale"
        />
        <View style={[styles.card, { width: width, height: height }]}>
          <Canvas
            ref={canvasRef}
            width={(width * 50) / 100}
            height={(height * 80) / 100}
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
              <Fontisto name="eraser" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="trash-bin" size={24} color="darkred" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                // props.navigation.reset({
                //   index: 0,
                //   routes: [{ name: "QuizEnd" }],
                // });
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
      <Modal
        transparent
        statusBarTranslucent
        style={{ margin: 0, flex: 1 }}
        visible={modalVisible}
      >
        <QuizEnd
          onPressHome={() => {
            setModalVisible(false);
            props.navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
          onPressNext={() => {
            setModalVisible(false);
            // props.navigation.reset({
            //   index: 0,
            //   routes: [{ name: "Next" }],
            // });
          }}
        />
      </Modal>
    </View>
  );
};

export default React.memo(Tracing);

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
  img: {
    width: 200,
    height: 200,
  },
  imgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    elevation: 9,
    width: 200,
    height: 200,
  },
});
