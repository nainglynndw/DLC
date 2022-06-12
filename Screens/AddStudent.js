import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import Input from "../Components/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../Components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { db } from "../API/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore/lite";
import Loading from "../Components/Loading";

const layout = Dimensions.get("window");

const AddStudent = (props) => {
  const teacherData = props.route.params;

  const [studentInfo, setStudentInfo] = useState({
    activated: false,
    teacherId: teacherData.id,
    name: "",
    level: "",
    address: "",
    phone: "",
    id: "",
    password: "",
    gender: "",
    dateOfBirth: new Date("2021-12-31"),
    createdAt: Timestamp.now(),
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const pickerRef = useRef();
  const [loading, setLoading] = useState(false);
  const usersCollection = collection(db, "student");
  const [showModal, setShowModal] = useState(false);

  const validate = async () => {
    const q = query(usersCollection, where("id", "==", studentInfo.id));
    const userSnapshot = await getDocs(q);
    const userList = userSnapshot.docs.map((doc) => doc.data());
    if (studentInfo.name.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nName must be atleast 4 characters .");
    if (studentInfo.level.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nLevel must be atleast 4 characters .");
    if (studentInfo.address.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nAddress must be atleast 4 characters .");
    if (studentInfo.gender.replace(/\s/g, "").length === 0)
      return alert("Error ! \nGender is not set  .");
    if (studentInfo.dateOfBirth.getTime() === 1640908800000)
      return alert("Error ! \nDate Of Birth is Not Changed .");
    if (studentInfo.phone.replace(/\s/g, "").length <= 8)
      return alert("Error ! \nPhone must be atleast 9 characters .");
    if (studentInfo.id.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nStudent ID must be at least 4 characters .");
    if (userList.length !== 0) return alert("Error ! \nUser ID already exists");
    if (studentInfo.password.length <= 5)
      return alert("Error ! \nPassword must be atleast 6 characters .");
    {
      setLoading(true);
      studentAdd();
      return;
    }
  };

  const studentAdd = async () => {
    await setDoc(doc(db, "student", studentInfo.id), studentInfo, {
      merge: false,
    });
    setLoading(false);
    setShowModal(true);
  };

  const Modal = () => {
    return (
      <View style={styles.modal}>
        <Text style={styles.complete}>Complete Adding Student !</Text>
        <Text
          style={styles.ok}
          onPress={() => {
            setShowModal(false);
            props.navigation.navigate("MyStudents", teacherData);
          }}
        >
          OK
        </Text>
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
          <Text style={styles.headerText}>Add student to your level</Text>
        </View>
        <View style={styles.half}></View>
      </View>

      <ScrollView>
        <View style={styles.rowContainer}>
          <View style={styles.half}>
            <Text style={styles.label}>Name</Text>
            <Input
              placeholder="Name"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, name: a });
              }}
            />
            <Text style={styles.label}>Level</Text>
            <Input
              placeholder="Level"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, level: a });
              }}
            />
            <Text style={styles.label}>Gender</Text>
            <Input
              value={
                studentInfo.gender.length === 0 ? null : studentInfo.gender
              }
              placeholder="Gender"
              onPressIn={() => {
                pickerRef.current.focus();
              }}
            />
            <Text style={styles.label}>Address</Text>
            <Input
              placeholder="Address"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, address: a });
              }}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Date of Birth</Text>
            <Input
              value={
                studentInfo.dateOfBirth.getTime() === 1640908800000
                  ? null
                  : studentInfo.dateOfBirth.toDateString()
              }
              placeholder="Date Of Birth"
              onPressIn={() => {
                setShowCalendar(true);
              }}
            />
            <Text style={styles.label}>Phone</Text>
            <Input
              placeholder="Phone"
              keyboardType="numeric"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, phone: a });
              }}
            />
            <Text style={styles.label}>Student ID</Text>
            <Input
              placeholder="Student ID"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, id: a });
              }}
            />
            <Text style={styles.label}>Password</Text>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, password: a });
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Button title="Add Student" onPress={validate} />
      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={studentInfo.dateOfBirth}
          mode="date"
          onChange={(_, date) => {
            Keyboard.dismiss();
            setShowCalendar(false);
            setStudentInfo({ ...studentInfo, dateOfBirth: date });
          }}
        />
      )}
      <Picker
        style={{ display: "none" }}
        ref={pickerRef}
        selectedValue={studentInfo.gender}
        onValueChange={(itemValue, itemIndex) => {
          Keyboard.dismiss();
          setStudentInfo({ ...studentInfo, gender: itemValue });
        }}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="အခြား" value="အခြား" />
        <Picker.Item label="မ" value="မ" />
        <Picker.Item label="ကျား" value="ကျား" />
      </Picker>
      {loading && <Loading open={loading} />}
      {showModal && <Modal />}
    </View>
  );
};

export default AddStudent;

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRowContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  rowContainer: {
    width: layout.width,
    flexDirection: "row",
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
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginLeft: "5%",
    marginTop: 10,
    marginBottom: -5,
    color: "blue",
  },
  modal: {
    width: 300,
    height: 200,
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "black",
    borderRadius: 10,
    position: "absolute",
    alignItems: "center",
  },
  complete: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  ok: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0081b8",
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "green",
  },
});
