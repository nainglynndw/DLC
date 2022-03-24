import { StyleSheet, Text, View, Dimensions, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import Button from "../Components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

const Login = (props) => {
  const width = Dimensions.get("window").height;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setscanning] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      setscanning(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleBarCodescanning = ({ type, data }) => {
    setscanning(false);
    if (data === "cbe+1647711000000")
      return props.navigation.reset({
        index: 0,
        routes: [{ name: "Tracing" }],
      });
    return alert("Log In Failed !");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      const scannedResult = await BarCodeScanner.scanFromURLAsync(result.uri);

      if (
        scannedResult.length > 0 &&
        scannedResult[0].data === "cbe+1647711000000"
      )
        return props.navigation.reset({
          index: 0,
          routes: [{ name: "Tracing" }],
        });
      return alert("Log In Failed !");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Login</Text> */}
      {scanning ? (
        <View
          style={{ width: "80%", height: "100%", justifyContent: "center" }}
        >
          <Camera
            onBarCodeScanned={!scanning ? undefined : handleBarCodescanning}
            style={StyleSheet.absoluteFillObject}
          />
          <View
            style={{
              alignSelf: "center",
              width: (90 * width) / 100,
              height: (90 * width) / 100,
              borderWidth: 5,
              borderStyle: "dashed",
              borderColor: "white",
              justifyContent: "center",
              borderRadius: 1,
            }}
          >
            <View
              style={{
                alignSelf: "center",
                width: (50 * width) / 100,
                height: (50 * width) / 100,
                borderWidth: 5,
                borderStyle: "dashed",
                borderColor: "white",
                justifyContent: "center",
                borderRadius: 1,
              }}
            ></View>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <View
              style={{
                width: "80%",
                marginBottom: -10,
              }}
            >
              <Button title={"Tap to Scan"} onPress={() => setscanning(true)} />
            </View>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={44}
              color="#5e185c"
            />
          </View>
          <View style={[styles.buttonContainer, { marginBottom: 0 }]}>
            <View
              style={{
                width: "80%",
                marginBottom: -10,
              }}
            >
              <Button title={"Choose File to scan"} onPress={pickImage} />
            </View>
            <MaterialCommunityIcons
              name="folder-multiple-image"
              size={44}
              color="#5e185c"
            />
          </View>
        </>
      )}
      <StatusBar hidden />
    </View>
  );
};

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  // header: {
  //   fontSize: 25,
  //   fontWeight: "bold",
  //   color: "#5e185c",
  //   alignSelf: "center",
  //   position: "absolute",
  //   top: 0,
  //   marginTop: StatusBar.currentHeight + 20,
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   backgroundColor: "#5e185c5f",
  //   borderRadius: 10,
  // },
  buttonContainer: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
});
