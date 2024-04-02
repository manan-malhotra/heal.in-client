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
import { theme } from "../../../constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import Header from "../../../components/Header";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";

const AddUsersFields = () => {
  let selectedValue;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(-1);
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    age: "",
    gender: null,
  });
  const handleInputChange = (name, text) => {
    console.log(text);
    setFormData({ ...formData, [name]: text });
  };

  const handleSubmit = () => {
    console.log(
      "Full Name: ",
      fullName,
      email,
      phoneNumber,
      password,
      formData.gender,
      formData.age
    );
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
          age: parseInt(formData.age),
          gender: formData.gender,
          password: password,
          role: "USER",
          contact: phoneNumber,
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
      <Header title="User" />
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
                keyboardType="numeric"
                secureTextEntry={false}
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
