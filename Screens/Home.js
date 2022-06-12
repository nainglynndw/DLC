import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import Container from "../Style/Container";
import Lesson from "../Components/Lesson";
import { Quiz } from "../Quiz/Quiz";
import * as color from "../Theme/color";
import { playSound, stopSound } from "../Music/PlayMusic";
import { useFocusEffect } from "@react-navigation/native";

const Home = (props) => {
  const [flWidth, setFlWidth] = useState(0);
  const data = Quiz;
  const [item, setItem] = useState({});
  const music = require("../assets/Music/home_theme.mp3");
  useFocusEffect(
    useCallback(() => {
      playSound(music);
      return () => {
        stopSound();
      };
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.titleContainer,
          { marginHorizontal: (flWidth - 400) / 10 },
        ]}
        onPress={() => {
          setItem(item);
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const Exercise = (item) => {
    return (
      <View style={styles.lessonModal}>
        <View style={[styles.titleContainer, { backgroundColor: "#fff" }]}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.rowContainer1}>
          {item.data.map((data, index) => (
            <Lesson
              key={index}
              type={data.type}
              name={data.name}
              sub={data.sub}
              anim={data.anim}
              onPress={() => {
                props.navigation.navigate(data.type, data);
              }}
            />
          ))}
        </View>
        <Text
          style={styles.close}
          onPress={() => {
            setItem({});
          }}
        >
          X
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.home, { padding: 0 }]}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/bg.jpg")}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={styles.rowContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profileImage}
            resizeMode="contain"
            resizeMethod="scale"
          />
          <Text style={styles.userName}>KOKO</Text>

          <Text style={styles.userName}>10/100</Text>
        </View>
        <FlatList
          numColumns={5}
          style={{
            flex: 1,
          }}
          data={data}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          onLayout={(e) => setFlWidth(e.nativeEvent.layout.width)}
        />
      </View>
      {item?.data?.length > 0 && Exercise(item)}
      <StatusBar hidden />
    </View>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({
  home: Container,
  rowContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  profileContainer: {
    backgroundColor: color.blue,
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 12,
    color: color.red,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 3,
    marginVertical: 10,
  },

  titleContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    backgroundColor: color.yellow,
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: color.blue,
  },
  lessonModal: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    backgroundColor: "#000000bf",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    textAlign: "center",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 100,
    elevation: 8,
    position: "absolute",
    top: 20,
    right: 20,
  },
});
