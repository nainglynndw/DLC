import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Container from "../Style/Container";
import { StatusBar } from "expo-status-bar";

import QuizEnd from "../Screens/QuizEnd";
const LAYOUT = Dimensions.get("window");

const RevisionChoice = (props) => {
  const data = props.route.params;
  const [correctData, setCorrectData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressed, setPressed] = useState({ leftPressed: "", rightPressed: "" });

  const leftItemPressed = (item, index, place) => {
    if (item === pressed.rightPressed) {
      setCorrectData([...correctData, item]);
      return;
    }
    return setPressed({ leftPressed: item, rightPressed: "" });
  };

  useEffect(() => {
    correctData.length === 4 && setModalVisible(true);
  }, [correctData]);

  const rightItemPressed = (item, index, place) => {
    if (item === pressed.leftPressed) {
      setCorrectData([...correctData, item]);
      return;
    }
    return setPressed({ leftPressed: "", rightPressed: item });
  };

  const leftRenderItem = ({ item, index }) => {
    const backgroundColor = correctData.includes(item)
      ? "green"
      : pressed.leftPressed === item
      ? "#eee"
      : "#5faff5";

    return (
      <TouchableOpacity
        style={[
          styles.leftItem,
          styles.item,
          { backgroundColor: backgroundColor },
        ]}
        onPress={() => leftItemPressed(item, index, "left")}
      >
        <Text style={styles.itemId}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const rightRenderItem = ({ item, index }) => {
    const backgroundColor = correctData.includes(item)
      ? "green"
      : pressed.rightPressed === item
      ? "#eee"
      : "#fa5757";
    return (
      <TouchableOpacity
        style={[
          styles.rightItem,
          styles.item,
          { backgroundColor: backgroundColor },
        ]}
        onPress={() => rightItemPressed(item, index, "right")}
      >
        <Text style={styles.itemId}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/bg.jpg")}
        style={[StyleSheet.absoluteFillObject]}
      />
      <Text style={styles.questionTitle}>
        မေးခွန်း - {"\t"}တူသော "အက္ခရာ" ကိုရွေးပါ ။
      </Text>
      <View style={styles.questionContainer}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={data?.data.leftData}
          renderItem={leftRenderItem}
          keyExtractor={(_, i) => i.toString()}
        />
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={data?.data.rightData}
          renderItem={rightRenderItem}
          keyExtractor={(_, i) => i.toString()}
        />
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

export default RevisionChoice;

const styles = StyleSheet.create({
  questionContainer: {
    alignSelf: "center",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: LAYOUT.width * 0.9,
    flexDirection: "row",
  },
  questionTitle: {
    marginVertical: 20,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
    backgroundColor: "#2b2b2b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    left: 30,
  },

  questionText: {
    fontWeight: "bold",
    color: "#fbc624",
    fontSize: 20,
  },
  leftItem: {
    borderColor: "#326694",
  },
  rightItem: {
    borderColor: "#943232",
  },
  item: {
    padding: 10,
    width: "90%",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  itemId: {
    fontWeight: "bold",
    fontSize: 18,
  },
  listContainer: { width: "50%", alignSelf: "center" },
});
