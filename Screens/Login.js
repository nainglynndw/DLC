import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import Container from "../Style/Container";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useFonts } from "expo-font";
import { playSound, stopSound } from "../Music/PlayMusic";
import { useFocusEffect } from "@react-navigation/native";

const Login = (props) => {
  const [loaded] = useFonts({
    Akaya: require("../assets/Fonts/JosefinSans/FredokaOneRegular.ttf"),
  });
  const music = require("../assets/Music/login_theme.mp3");
  const animation = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1];
  const outputRange = [0, 1];
  const scale = animation.interpolate({ inputRange, outputRange });

  const [type, setType] = useState("student");

  const data = [
    { value: "teacher", img: require("../assets/images/teacher_icon.png") },
    { value: "student", img: require("../assets/images/student_icon.png") },
  ];

  const showAnim = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const reverseAnim = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => showAnim());
  };

  useFocusEffect(
    useCallback(() => {
      playSound(music);
      setTimeout(() => {
        showAnim();
      }, 500);
      return () => {
        stopSound(music);
        clearTimeout();
      };
    }, [])
  );

  return (
    <View style={[styles.loginContainer, Container]}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/bg.jpg")}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={styles.halfContainer}>
        <Animated.Image
          source={require("../assets/images/dlc_logo.png")}
          style={[
            styles.logo,
            {
              transform: [
                { scale: scale },
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ["0deg", "180deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.accTypeContainer}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.iconContainer,
                  {
                    borderColor: item.value === type ? "#3bebc28f" : "white",
                  },
                ]}
                key={index}
                onPress={() => {
                  reverseAnim();
                  setType(item.value);
                }}
              >
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  source={item.img}
                  style={[
                    item.value === "teacher" ? styles.icon : styles.icon2,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Input
          placeholder={type === "student" ? "Student's ID" : "Teacher's Email"}
          onChangeText={() => {
            console.log("GG");
          }}
        />
        <Input
          placeholder="Password"
          onChangeText={() => {
            console.log("GG");
          }}
        />
        <Button
          title="Login"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        />
        {loaded && (
          <Text
            style={[styles.link, { fontFamily: "Akaya" }]}
            onPress={() => {
              console.log("OK");
            }}
          >
            Contact us
          </Text>
        )}
      </ScrollView>

      <StatusBar hidden />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  halfContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  link: {
    width: "90%",
    textAlign: "right",
    color: "#327da8",
  },
  accTypeContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icon: {
    width: 45,
    height: 45,
  },
  icon2: {
    width: 35,
    height: 35,
  },
  iconContainer: {
    marginBottom: 10,
    width: 50,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    borderRadius: 100,
    borderWidth: 5,
  },
});
