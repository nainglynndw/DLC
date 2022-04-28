import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  Text,
  Dimensions,
  ImageBackground,
  Vibration,
  Modal,
  TouchableOpacity,
} from "react-native";
import { DraxProvider, DraxView } from "react-native-drax";
import QuizEnd from "./QuizEnd";
import { Audio } from "expo-av";

const sound = new Audio.Sound();
const layout = Dimensions.get("window");

const DnD = (props) => {
  const data = props.route.params;

  const questionSound = data.sound;
  const [modalVisible, setModalVisible] = useState(false);
  const dropAnimation = useRef(new Animated.Value(0)).current;
  const pot = useRef(new Animated.Value(0)).current;

  const loadSound = async () => {
    try {
      await sound.loadAsync(questionSound);
    } catch (error) {
      console.log(error);
    }
  };

  const moveWord = () => {
    Animated.timing(dropAnimation, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {});
  };

  const shakePot = () => {
    Animated.sequence([
      Animated.timing(pot, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pot, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      pot.setValue(0);
    });
  };

  const showError = () => {
    Vibration.vibrate(1000);
    shakePot();
  };

  const yVal = dropAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  const rotateDeg = pot.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-5deg", "5deg"],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotateDeg,
      },
    ],
  };

  useEffect(() => {
    moveWord();
    loadSound();
    return () => {
      sound.stopAsync();
      sound.unloadAsync();
    };
  }, []);

  const playSound = async () => {
    try {
      await sound.replayAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DraxProvider>
      <View style={styles.container}>
        <Text style={styles.questionTitle}>
          မေးခွန်း - {"\t"}"{data.question}" ကိုရွေးပါ
        </Text>
        <View style={styles.rowContainer}>
          {data.data?.length > 0 &&
            data.data.map((item) => (
              <DraxView
                key={item.id}
                style={[styles.dragable, animStyle]}
                onDragStart={() => {}}
                onDragEnd={() => {
                  Animated.timing(pot).stop();
                }}
                payload={item.id}
              >
                <ImageBackground
                  resizeMode="contain"
                  source={item.img}
                  style={styles.dropItem}
                >
                  <Text style={styles.dragText}>{item.id}</Text>
                </ImageBackground>
              </DraxView>
            ))}
        </View>
        <View style={{ flex: 1 }}></View>
        <DraxView
          renderContent={() => {
            return (
              <TouchableOpacity
                style={[styles.receiver, rotateStyle]}
                onPress={() => {
                  playSound();
                }}
              >
                <Animated.Image
                  resizeMode="contain"
                  source={require("../assets/dropItems/pot.png")}
                  style={[styles.dropItem, , { bottom: -110 }]}
                />
                <Text style={styles.question}>{data.question}</Text>
              </TouchableOpacity>
            );
          }}
          receptive
          onReceiveDragEnter={({ dragged: { payload } }) => {
            if (data.answer !== payload) return showError();

            return setModalVisible(true);
          }}
          onReceiveDragOver={({ dragged: { payload } }) => {}}
        ></DraxView>
      </View>
      <StatusBar hidden />
      <Modal
        statusBarTranslucent
        style={{ margin: 0, flex: 1 }}
        visible={modalVisible}
        animationType="slide"
        transparent
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
          }}
        />
      </Modal>
    </DraxProvider>
  );
};

export default DnD;

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    flex: 1,
    backgroundColor: "#2b2b2b",
  },
  dragable: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  dragText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  receiver: {
    width: 120,
    height: 120,
    marginBottom: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  dropItem: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    width: layout.width,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  questionTitle: {
    marginTop: 20,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
    backgroundColor: "#2b2b2b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    position: "absolute",
    left: 30,
  },
  question: {
    fontSize: 50,
    color: "green",
    fontWeight: "bold",
    bottom: -20,
  },
});
