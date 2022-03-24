import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";

const Loading = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }, 4000);
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
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
