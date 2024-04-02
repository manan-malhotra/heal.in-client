import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../constants/Colors";
import MyTextInput from "../components/TextInput";
import { AuthContext } from "../context/authcontext";
import { useRouter, Link } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import CustomKeyboardView from "../components/CustomKeyboardView";

export default function SignUp() {
  const router = useRouter();
  const { register } = useContext(AuthContext);
  let selectedValue;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(-1);
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    age: "",
    gender: null,
  });

  const handleSignUp = () => {
    const [firstName, lastName] = fullName.split(" ");
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: phoneNumber,
      gender: formData.gender,
      age: formData.age,
      password: password,
      role: "USER",
    };
    try {
      register(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (name, text) => {
    console.log(text);
    setFormData({ ...formData, [name]: text });
  };

  return (
    <View style={styles.body}>
      <View>
        <View
          style={{
            backgroundColor: "white",
            paddingTop: "10%",
            paddingBottom: "2%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.leftContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 80, height: 80, resizeMode: "contain" }}
            ></Image>

            <View style={styles.rightContainer}>
              <Text
                style={{
                  fontSize: hp(5),
                  fontWeight: "600",
                  color: theme.colors.button,
                }}
              >
                heal.in
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: hp(7),
          paddingTop: hp(1),
          paddingLeft: wp(9),
        }}
      >
        <Text
          style={{
            fontSize: hp(2.8),
            fontWeight: "700",
            color: theme.colors.button,
          }}
        >
          SIGN UP
        </Text>
      </View>
      <CustomKeyboardView inChat={false}>
        <View style={{ backgroundColor: "white" }}>
          <MyTextInput
            placeholderText={"Full Name"}
            icon={"user"}
            onChangeText={setFullName}
          />
          <MyTextInput
            placeholderText={"Email"}
            icon={"mail"}
            isEmail={true}
            onChangeText={setEmail}
          />
          <MyTextInput
            placeholderText={"Phone Number"}
            icon={"smartphone"}
            onChangeText={setPassword}
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
            placeholderText={"Password"}
            icon={"lock"}
            isPassword={true}
            onChangeText={setPassword}
          />
        </View>
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              height: hp(10),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ padding: hp(1) }}></View>
            <TouchableOpacity
              onPress={() => {
                handleSignUp();
              }}
            >
              <View
                style={{
                  backgroundColor: theme.colors.button,
                  height: hp(6.2),
                  width: wp(60),
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: hp(2.5),
                  }}
                >
                  Create Account
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 20 }}></View>
          <View
            style={{
              height: hp(10),
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: hp(3),
                width: wp(100),
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Link href="signIn">Already have an account?</Link>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: hp(10),
  },
  heading: {
    height: hp(10),
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    paddingLeft: wp(5),
    gap: wp(1),
  },
  rightContainer: {
    flexDirection: "row",
    gap: wp(10),
    alignItems: "center",
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
