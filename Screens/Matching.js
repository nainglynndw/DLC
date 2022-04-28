import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Container from "../Style/Container";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import QuizEnd from "../Screens/QuizEnd";

const Matching = (props) => {
  const data = props.route.params;
  const [correct, setCorrect] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.questionContainer,
        {
          backgroundColor:
            correct === item.id && item.id === data.answer
              ? "green"
              : correct === item.id && item.id !== data.answer
              ? "red"
              : "#267fb3",
        },
      ]}
      onPress={() => {
        if (item.id === data.answer) {
          setCorrect(item.id);
          setTimeout(() => {
            setModalVisible(true);
          }, 500);
        } else {
          setCorrect(item.id);
        }
      }}
    >
      <LottieView
        source={item.anim}
        resizeMode="cover"
        autoPlay={true}
        loop
        style={styles.questionAnim}
      />
      <Text style={styles.questionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={Container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/bg.jpg")}
        style={[StyleSheet.absoluteFillObject]}
      />
      <Text style={styles.questionTitle}>
        မေးခွန်း - {"\t"}"{data.question}" ကိုရွေးပါ
      </Text>
      <FlatList
        horizontal
        data={data.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
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

export default Matching;

const styles = StyleSheet.create({
  questionContainer: {
    alignSelf: "center",
    backgroundColor: "#267fb3",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    alignItems: "center",
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
    left: 30,
  },
  questionAnim: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    margin: 10,
  },
  questionText: {
    fontWeight: "bold",
    color: "#fbc624",
    fontSize: 20,
  },
});
