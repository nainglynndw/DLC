import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Modal,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import QuizEnd from "../Screens/QuizEnd";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
const sound = new Audio.Sound();

const Train = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const fullData = props.route.params;
  const data = fullData.data;
  const questionSound = fullData.sound;
  const startPoint = (data.length + 1) * 100;
  const trainRef = useRef(new Animated.Value(0)).current;
  const blackboardRef = useRef(new Animated.Value(0)).current;
  const [answerIndex, setAnswerIndex] = useState([]);
  const [answerLength, setAnswerLength] = useState(0);
  const moveTrain = () => {
    Animated.timing(trainRef, {
      toValue: 1,
      duration: (data.length + 1) * 2000,
      useNativeDriver: true,
    }).start(() => {
      trainRef.setValue(0);
      moveTrain();
    });
  };

  const moveBlackBoard = () => {
    Animated.spring(blackboardRef, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const xVal = trainRef.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").width, -startPoint],
  });

  const blackBoardVal = blackboardRef.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, Dimensions.get("window").width / 2 - 75],
  });

  const animStyle = {
    transform: [
      {
        translateX: xVal,
      },
    ],
  };

  const blackBoardMoveStyle = {
    transform: [
      {
        translateX: blackBoardVal,
      },
    ],
  };

  const loadSound = async () => {
    try {
      await sound.loadAsync(questionSound);
    } catch (error) {
      console.log(error);
    }
  };

  const playSound = async () => {
    try {
      await sound.replayAsync();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSound();
    moveTrain();
    let num = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === fullData.answer) {
        num = num + 1;
      }
      setAnswerLength(num);
    }
    moveBlackBoard();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.trainBox]}
        onPressIn={() => {
          if (item === fullData.answer && !answerIndex.includes(index))
            setAnswerIndex([...answerIndex, index]);
        }}
        onPressOut={() => {
          if (answerIndex.length === answerLength) return setModalVisible(true);
        }}
      >
        <Text
          style={[
            styles.text,
            {
              backgroundColor: answerIndex.includes(index)
                ? "#1c9482"
                : "#003461",
            },
          ]}
        >
          {item}
        </Text>
        <Image
          source={require("../assets/train/cabin.png")}
          style={styles.trainCabin}
          resizeMode="cover"
          resizeMethod="scale"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.trainContainer, { width: startPoint + 100 }]}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/bg.jpg")}
        style={[StyleSheet.absoluteFillObject]}
      />
      <Text style={styles.questionTitle}>
        မေးခွန်း - {"\t"}"{fullData.question}" ကိုရွေးပါ
      </Text>
      <Animated.View
        style={[styles.train, animStyle, { width: startPoint + 100 }]}
      >
        <Image
          source={require("../assets/train/head.png")}
          style={styles.trainCabin}
        />
        <FlatList
          contentContainerStyle={{
            alignItems: "center",
          }}
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </Animated.View>
      <Animated.View style={[blackBoardMoveStyle, styles.blackboardContainer]}>
        <TouchableOpacity style={styles.blackboard} onPress={playSound}>
          <ImageBackground
            style={styles.blackboard}
            source={require("../assets/images/blackboard.png")}
          >
            <Text style={styles.blackboardText}>{fullData.question}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
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
          }}
        />
      </Modal>
    </View>
  );
};

export default React.memo(Train);

const styles = StyleSheet.create({
  trainContainer: {
    flex: 1,
    justifyContent: "center",
  },

  image: {
    width: Dimensions.get("screen").width,
    flex: 1,
    justifyContent: "center",
  },
  train: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  trainBox: {
    alignItems: "center",
  },
  trainCabin: {
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    width: 80,
    borderRadius: 5,
    backgroundColor: "#003461",
    marginBottom: -30,
  },
  questionTitle: {
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
    backgroundColor: "#2b2b2b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    position: "absolute",
    top: 20,
    left: 30,
  },
  blackboard: {
    width: 150,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  blackboardContainer: {
    alignSelf: "flex-start",
    position: "absolute",
    bottom: 10,
  },
  blackboardText: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
  },
});
