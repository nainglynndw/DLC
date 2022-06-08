import { StyleSheet, View, StatusBar } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { Storage } from "expo-storage";

const Loading = (props) => {
  const getItem = async () => {
    const item = JSON.parse(await Storage.getItem({ key: "isIntroFinished" }));

    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: item ? "Login" : "IntroScreen" }],
      });
    }, 4000);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <View style={styles.loading}>
      <LottieView
        autoPlay={true}
        loop
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#f1f1f1",
        }}
        source={require("../assets/Animation/loading.json")}
      />
      <StatusBar hidden />
    </View>
  );
};

export default React.memo(Loading);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
