import {
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
import React, { useEffect, useState } from "react";
import { theme } from "../../../constants/Colors";
import Header from "../../../components/Header";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";
import { router } from "expo-router";
import GenderDropDown from "../../../components/GenderDropDown";

const AddUsersFields = () => {
  let selectedValue;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(-1);
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [validationError, setValidationError] = useState("");
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^\d{10}$/;
  const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
  useEffect(() => {
    if (
      fullName.trim() != "" &&
      email.trim() != "" &&
      phoneNumber &&
      password.trim() != "" &&
      gender &&
      age &&
      validationError === "Please fill all the entries"
    ) {
      setValidationError("");
    }
    if (
      nameRegex.test(fullName) &&
      validationError ===
        "Please enter first name and last name separated by a space"
    ) {
      setValidationError("");
    }
    if (
      emailRegex.test(email) &&
      validationError === "Please enter a valid email"
    ) {
      setValidationError("");
    }
    if (
      contactRegex.test(phoneNumber)
    ) {
      setValidationError("");
    }
    if (
      passwordRegex.test(password) &&
      validationError === "Please enter a valid password"
    ) {
      setValidationError("");
    }
  }, [fullName, email, phoneNumber, gender, age, password]);
  const handleSubmit = () => {
    handleSave();
  };
  const handleSave = async () => {
    function validateFormData(
      fullName,
      email,
      phoneNumber,
      gender,
      age,
      password
    ) {
      if (
        fullName.trim() === "" ||
        email.trim() === "" ||
        !phoneNumber ||
        password.trim() === "" ||
        !gender ||
        !age
      ) {
        setValidationError("Please fill all the entries");
        return false;
      }
      if (!nameRegex.test(fullName)) {
        setValidationError(
          "Please enter first name and last name separated by a space"
        );
        return false;
      }
      if (!emailRegex.test(email)) {
        setValidationError("Please enter a valid email");
        return false;
      }
      if (!contactRegex.test(phoneNumber)) {
        setValidationError("Please enter a valid 10 digit phone number");
        return false;
      }
      if (!passwordRegex.test(password)) {
        setValidationError("Please enter a valid password");
        return false;
      }

      setValidationError("");
      return true;
    }
    const valid = validateFormData(
      fullName,
      email,
      phoneNumber,
      gender,
      age,
      password
    );
    if (!valid) {
      return;
    }
    const [firstName, lastName] = fullName.split(" ");
    try {
      const response = await axios.post(
        process.env.API_HOST + "/api/user/register",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          age: parseInt(age),
          gender: gender,
          password: password,
          role: "USER",
          contact: phoneNumber,
        }
      );
      if (response.status === 200) {
        console.log("SUCCESS");
        router.back();
      }
    } catch (error) {
      if (error.response.status === 409) {
        setValidationError("Email ID is taken.");
      } else {
        console.log("Error saving post: " + error.response.status);
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Header title="User" />
      <View
        style={{ backgroundColor: "white", height: hp(70), paddingTop: "8%" }}
      >
        {validationError && <ErrorView error={validationError} />}
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
          isNum={true}
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
              <GenderDropDown onChangeText={setGender} />
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
                placeholderTextColor="#ADADAD"
                style={styles.textInput}
                keyboardType="numeric"
                secureTextEntry={false}
                value={age}
                onChangeText={(text) => setAge(text)}
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
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text
                style={{ fontSize: hp(2.2), fontWeight: "600", color: "white" }}
              >
                Create User
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AddUsersFields;

const ErrorView = ({ error }) => {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        paddingBottom: 10,
        width: wp(80),
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: hp(-1),
        marginBottom: hp(0.45),
      }}
    >
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

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
  error: {
    color: theme.colors.error,
  },
});
