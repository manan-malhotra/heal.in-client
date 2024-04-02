import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { router } from "expo-router";
import { theme } from "../../../constants/Colors";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import AddCardUsers from "../../../components/AddCardUsers";
import Header from "../../../components/Header";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";

const AddDoctorFields = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [fullName, setFullName] = useState("");
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(-1);
  const [experience, setExperience] = useState("");
  const [licenseNumber, setLicenseNumber] = useState(-1);
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [formData, setFormData] = useState({
    age: "",
    gender: null,
  });
  const handleInputChange = (name, text) => {
    console.log(text);
    setFormData({ ...formData, [name]: text });
  };
  let selectedValue;
  const handleSubmit = () => {
    console.log(
      "Full Name: ",
      fullName,
      email,
      phoneNumber,
      password,
      formData.gender,
      formData.age,
      degree,
      experience,
      specialization,
      licenseNumber
    );
    handleSave();
  };
  const handleSave = async () => {
    const [firstName, lastName] = fullName.split(" ");
    try {
      const response = await axios.post(
        process.env.API_HOST + "/doctors/addDoctor",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          age: parseInt(formData.age),
          gender: formData.gender,
          password: password,
          role: "DOCTOR",
          contact: phoneNumber,
          degree: degree,
          experience: experience,
          license_number: licenseNumber,
          specialization: specialization,
        }
      );
      if (response.status === 200) {
        console.log("SUCCESS");
      }
    } catch (error) {
      console.log("Error saving post: " + error);
      console.log(error.data.message);
    }
  };

  return (
    <View style={styles.body}>
      <Header title="Doctor" />
      <View
        style={{ backgroundColor: "white", height: hp(70), paddingTop: "8%" }}
      >
        <ScrollView>
          <MyTextInput
            icon="user"
            placeholderText={"Full Name"}
            onChangeText={setFullName}
          />

          <MyTextInput
            placeholderText="Email"
            icon="mail"
            isEmail={true}
            onChangeText={setEmail}
          />
          <MyTextInput
            placeholderText="Phone Number"
            icon="smartphone"
            onChangeText={setPhoneNumber}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                paddingTop: hp(0.7),
                width: wp(39),
                marginRight: 0,
                marginLeft: "auto",
              }}
            >
              <View style={styles.card}>
                <RNPickerSelect
                  onValueChange={(text) => handleInputChange("gender", text)}
                  items={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  placeholder={{
                    label: "Gender",
                    value: null,
                  }}
                  value={selectedValue}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingVertical: 8.5,
                      paddingLeft: 10,
                      color: "black",
                      paddingRight: 30,
                      fontWeight: "600",
                      fontSize: 20,
                    },
                  }}
                />
              </View>
            </View>

            <View
              style={{
                paddingTop: hp(0.7),
                width: wp(39),
                marginRight: "auto",
                marginLeft: 10,
              }}
            >
              <View style={styles.card}>
                <TextInput
                  placeholder="Age"
                  style={styles.textInput}
                  value={formData.age}
                  onChangeText={(text) => handleInputChange("age", text)}
                />
              </View>
            </View>
          </View>
          <MyTextInput
            placeholderText="Password"
            icon="lock"
            isPassword={true}
            onChangeText={setPassword}
          />
          <MyTextInput
            placeholderText="Degree"
            icon="bookmark"
            onChangeText={setDegree}
          />
          <MyTextInput
            placeholderText="Specialization"
            icon="columns"
            onChangeText={setSpecialization}
          />
          <MyTextInput
            placeholderText="Experience"
            icon="briefcase"
            onChangeText={setExperience}
          />
          <MyTextInput
            placeholderText="License Number"
            icon="code"
            onChangeText={setLicenseNumber}
          />
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: wp(45),
            backgroundColor: theme.colors.button,
            height: hp(5.5),
            borderRadius: 20,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text
                style={{ fontSize: hp(2.2), fontWeight: "600", color: "white" }}
              >
                Create Doctor
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AddDoctorFields;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.background,
    marginBottom: hp(2),
  },
  icon: {
    marginRight: wp(4),
    marginLeft: wp(3),
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "600",
  },
});
