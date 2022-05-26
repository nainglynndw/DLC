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
import { updateDoc, doc } from "firebase/firestore/lite";
import Loading from "../Components/Loading";

const layout = Dimensions.get("window");

const EditStudent = (props) => {
  const data = props.route.params;

  const [studentInfo, setStudentInfo] = useState({
    ...data,
    dateOfBirth: data.dateOfBirth.toDate(),
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const pickerRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validate = async () => {
    if (studentInfo.name.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nName must be atleast 4 characters .");
    if (studentInfo.class.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nClass must be atleast 4 characters .");
    if (studentInfo.address.replace(/\s/g, "").length <= 3)
      return alert("Error ! \nAddress must be atleast 4 characters .");
    if (studentInfo.gender.replace(/\s/g, "").length === 0)
      return alert("Error ! \nGender is not set  .");
    if (studentInfo.dateOfBirth.getTime() === 1640908800000)
      return alert("Error ! \nDate Of Birth is Not Changed .");
    if (studentInfo.phone.replace(/\s/g, "").length <= 8)
      return alert("Error ! \nPhone must be atleast 9 characters .");
    if (studentInfo.password.length <= 5)
      return alert("Error ! \nPassword must be atleast 6 characters .");
    {
      setLoading(true);
      edit();
      return;
    }
  };

  const edit = async () => {
    const studentRef = doc(db, "student", studentInfo.id);
    await updateDoc(studentRef, studentInfo);
    setLoading(false);
    setShowModal(true);
  };

  const Modal = () => {
    return (
      <View style={styles.modal}>
        <Text style={styles.complete}>Complete Editing Student !</Text>
        <Text
          style={styles.ok}
          onPress={() => {
            setShowModal(false);
            props.navigation.navigate("MyStudents", data);
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
          <Text style={styles.headerText}>Add student to your class</Text>
        </View>
        <View style={styles.half}></View>
      </View>

      <ScrollView>
        <View style={styles.rowContainer}>
          <View style={styles.half}>
            <Text style={styles.label}>Name</Text>
            <Input
              value={studentInfo.name.length === 0 ? null : studentInfo.name}
              placeholder="Name"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, name: a });
              }}
            />
            <Text style={styles.label}>Class</Text>
            <Input
              value={studentInfo.class.length === 0 ? null : studentInfo.class}
              placeholder="Class"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, class: a });
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
              value={
                studentInfo.address.length === 0 ? null : studentInfo.address
              }
              placeholder="Address"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, address: a });
              }}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Date Of Birth</Text>
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
              value={studentInfo.phone.length === 0 ? null : studentInfo.phone}
              placeholder="Phone"
              keyboardType="numeric"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, phone: a });
              }}
            />
            <Text style={styles.label}>Student ID</Text>
            <Input
              editable={false}
              value={studentInfo.id.length === 0 ? null : studentInfo.id}
              placeholder="Student ID"
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, id: a });
              }}
            />
            <Text style={styles.label}>Password</Text>
            <Input
              value={
                studentInfo.password.length === 0 ? null : studentInfo.password
              }
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(a) => {
                setStudentInfo({ ...studentInfo, password: a });
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Button title="Edit Student" onPress={validate} />
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
        <Picker.Item label="အခြား" value="အခြား" />
        <Picker.Item label="မိန်းကလေး" value="မိန်းကလေး" />
        <Picker.Item label="ယောက်ျားလေး" value="ယောက်ျားလေး" />
      </Picker>
      {loading && <Loading open={loading} />}
      {showModal && <Modal />}
    </View>
  );
};

export default EditStudent;

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
