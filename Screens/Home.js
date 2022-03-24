import { StyleSheet, View, FlatList, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Container from "../Style/Container";
import Lesson from "../Components/Lesson";

const Home = (props) => {
  const data = [
    "၁",
    "၂",
    "၃",
    "၄",
    "၅",
    "၆",
    "၇",
    "၈",
    "၉",
    "၁၀",
    "၁၁",
    "၁၂",
    "၁၃",
    "၁၄",
    "၁၅",
    "၁၆",
    "၁၇",
    "၁၈",
    "၁၉",
    "၂၀",
    "၂၁",
    "၂၂",
    "၂၃",
  ];

  const renderItem = ({ item }) => {
    return <Lesson name={item} />;
  };

  return (
    <View style={[styles.home]}>
      <View style={styles.rowContainer}>
        <View style={styles.profileContainer}>
          <Text>KOKO</Text>
        </View>
        <FlatList
          contentContainerStyle={{ alignItems: "flex-end" }}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          data={data}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      </View>
      <StatusBar hidden />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: Container,
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
