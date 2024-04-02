import {
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
import Header from "../../../components/Header";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";
import GenderDropDown from "../../../components/GenderDropDown";

const AddResponderFields = () => {
  let selectedValue;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(-1);
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);

  const handleSubmit = () => {
    handleSave();
  };
  const handleSave = async () => {
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
          role: "RESPONDER",
          contact: phoneNumber,
        }
      );
      if (response.status === 200) {
        console.log("SUCCESS");
        router.back();
      }
    } catch (error) {
      console.log("Error saving post: " + error);
      console.log(error.data.message);
    }
  };

  return (
    <View style={styles.body}>
      <Header title="Responder" />
      <View
        style={{ backgroundColor: "white", height: hp(70), paddingTop: "8%" }}
      >
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
                Create Responder
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AddResponderFields;

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
