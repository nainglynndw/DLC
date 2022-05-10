import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../API/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore/lite";
import Loading from "../Components/Loading";

const layout = Dimensions.get("window");

const MyStudents = (props) => {
  const teacherData = props.route.params;
  const [students, setStudents] = useState([]);
  const [loading, setloading] = useState(false);
  const usersCollection = collection(db, "student");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const getData = async () => {
    const q = query(usersCollection, where("teacherId", "==", teacherData.id));
    const userSnapshot = await getDocs(q);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    setStudents([...userList]);
    if (selectedStudent) {
      const find = userList.filter((a) => a.id === selectedStudent.id);
      setSelectedStudent(find[0]);
    }
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const activate = async (activate) => {
    setloading(true);
    const studentRef = doc(db, "student", selectedStudent.id);
    await updateDoc(studentRef, {
      activated: activate,
    });
    setloading(false);
    setRefresh(!refresh);
  };

  const studentRenderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.rowContainer1,
          {
            backgroundColor: "grey",
            borderWidth: 1,
            borderColor: "#fff",
            paddingRight: 10,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.studentItem}
          onPress={() => {
            setSelectedStudent(item);
          }}
        >
          <Text style={styles.studentName}>{item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            props.navigation.navigate("EditStudent", item);
          }}
        >
          <Text style={styles.editText}>Edit Student</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/bg.jpg")}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={styles.headerRowContainer}>
        <TouchableOpacity
          style={[styles.half, { alignItems: "flex-start", paddingLeft: 10 }]}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left-bold"
            size={34}
            color="green"
          />
        </TouchableOpacity>
        <View style={styles.half}>
          <Text style={styles.headerText}>My Students</Text>
        </View>
        <View style={styles.half}></View>
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.half]}>
          <FlatList
            style={{ alignSelf: "flex-start" }}
            data={students}
            renderItem={studentRenderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.half}>
          <ScrollView>
            <View style={[styles.studentDataBox, styles.rowContainer1]}>
              <Text style={styles.studentData}>
                Activated - {selectedStudent?.activated?.toString()}
              </Text>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                  activate(selectedStudent?.activated ? false : true);
                }}
              >
                <Text style={styles.editText}>
                  {selectedStudent?.activated ? "Deactivate" : "Activate"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.studentDataBox}>
              <Text style={styles.studentData}>
                Name - {selectedStudent?.name}
              </Text>
            </View>
            <View style={styles.studentDataBox}>
              <Text style={styles.studentData}>
                Class - {selectedStudent?.class}
              </Text>
            </View>
            <View style={styles.studentDataBox}>
              <Text style={styles.studentData}>
                Date Of Birth -{" "}
                {selectedStudent?.dateOfBirth.toDate().toDateString()}
              </Text>
            </View>
            <View style={styles.studentDataBox}>
              <Text style={styles.studentData}>
                Phone - {selectedStudent?.phone}
              </Text>
            </View>
            <View style={styles.studentDataBox}>
              <Text style={styles.studentData}>
                Address - {selectedStudent?.address}
              </Text>
            </View>
            <View style={styles.studentDataBox}>
              <Text style={styles.studentData}>
                Created At -{" "}
                {selectedStudent?.createdAt.toDate().toDateString()}
              </Text>
            </View>
            <View style={styles.studentDataBox}>
              <Text style={styles.studentData}>ID - {selectedStudent?.id}</Text>
            </View>
            <View style={styles.studentDataBox}>
              <Text style={styles.studentData}>
                Password - {selectedStudent?.password}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
      {loading && <Loading open={loading} />}
      <StatusBar hidden />
    </View>
  );
};

export default MyStudents;

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    flex: 1,
  },
  headerRowContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "lightblue",
    alignItems: "center",
    marginBottom: 10,
  },
  half: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3064ff",
  },
  rowContainer: {
    flex: 1,
    width: layout.width,
    flexDirection: "row",
  },
  studentItem: {
    width: "75%",
    padding: 10,
  },
  studentName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  studentDataBox: {
    width: layout.width / 2,
    padding: 10,
    borderColor: "lightblue",
    backgroundColor: "#2b2b2b",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "flex-end",
    borderWidth: 1,
    marginBottom: 10,
  },
  studentData: {
    color: "#fff",
  },
  rowContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editBtn: {
    padding: 5,
    backgroundColor: "lightblue",
    borderRadius: 5,
    elevation: 3,
  },
  editText: { fontSize: 10, color: "black" },
});
