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
} from "react-native";
import React, { useRef, useEffect } from "react";
import Container from "../Style/Container";
import { Quiz1 } from "../Quiz/Quiz";
import { StatusBar } from "expo-status-bar";

const startPoint = (Quiz1.length + 1) * 150;
console.log(startPoint);
const Train = () => {
  const trainRef = useRef(new Animated.Value(0)).current;

  const moveTrain = () => {
    Animated.timing(trainRef, {
      toValue: 1,
      duration: (Quiz1.length + 1) * 2000,
      useNativeDriver: true,
    })
      // .start(() => {
      //   Animated.timing(trainRef, {
      //     toValue: 0,
      //     duration: 5000,
      //     useNativeDriver: true,
      //   })
      .start(() => {
        trainRef.setValue(0);
        moveTrain();
      });
    // });
  };

  const xVal = trainRef.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get("window").width, -startPoint],
  });

  // const ReverseX = trainRef.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, Dimensions.get("window").width],
  // });

  // const yVal = trainRef.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 350],
  // });

  const animStyle = {
    transform: [
      {
        translateX: xVal,
      },
      // {
      //   translateY: yVal,
      // },
    ],
  };

  useEffect(() => {
    moveTrain();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.trainBox]}
        onPress={() => {
          alert(item);
        }}
      >
        <Text style={styles.text}>{item}</Text>
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
    <View style={[styles.trainContainer]}>
      <ImageBackground
        source={require("../assets/grass/grass.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Animated.View style={[styles.train, animStyle]}>
          <Image
            source={require("../assets/train/head.png")}
            style={styles.trainCabin}
          />
          <FlatList
            contentContainerStyle={{
              alignItems: "center",
            }}
            horizontal
            data={Quiz1}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </Animated.View>
      </ImageBackground>
      <StatusBar hidden />
    </View>
  );
};

export default Train;

const styles = StyleSheet.create({
  trainContainer: {
    width: startPoint + 100,
    flex: 1,
  },

  image: {
    width: Dimensions.get("screen").width,
    flex: 1,
    justifyContent: "center",
  },
  train: {
    width: startPoint + 100,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  trainBox: {
    alignItems: "center",
  },
  trainCabin: {
    width: 150,
    height: 150,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 60,
    width: 120,
    borderRadius: 5,
    backgroundColor: "#003461",
    marginBottom: -30,
  },
});
