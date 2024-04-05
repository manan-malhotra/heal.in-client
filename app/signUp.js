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
import GenderDropDown from "../components/GenderDropDown";
import CustomKeyboardView from "../components/CustomKeyboardView";

export default function SignUp() {
  const router = useRouter();
  const { register } = useContext(AuthContext);
  let selectedValue;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(-1);
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [errors, setErrors] = useState("");

  const handleSignUp = () => {
    const [firstName, lastName] = fullName.split(" ");
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: phoneNumber,
      gender: gender,
      age: parseInt(age),
      password: password,
      role: "USER",
    };

    const CustomTextInput = ({
      placeholderText,
      icon,
      isEmail,
      isNum,
      onChangeText,
      value,
      error,
    }) => {
      return (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            {/* Your icon rendering code */}
          </View>
          <MyTextInput
            style={styles.input}
            placeholder={placeholderText}
            placeholderTextColor={theme.colors.placeholder}
            onChangeText={onChangeText}
            keyboardType={
              isNum ? "numeric" : isEmail ? "email-address" : "default"
            }
            value={value}
          />
          {error && (
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="error" size={10} color="red" />
              <Text style={styles.error}>{error}</Text>
            </View>
          )}
        </View>
      );
    };

    function validateRegistrationData(data) {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
      let errors = {};

      if (!data.firstName || data.firstName.trim() === "") {
        errors.fullName = "Name cannot be empty";
      }
      if (!data.lastName || data.firstName.trim() === "") {
        errors.fullName = "Last name needed";
      }
      if (!data.age || isNaN(data.age)) {
        errors.age = "Enter Valid age";
      }

      if (!data.gender) {
        errors.gender = "Select gender";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || !emailRegex.test(data.email)) {
        errors.email = "Email must be a valid email address";
      }

      const contactRegex = /^\d{10}$/;
      if (!data.contact || !contactRegex.test(data.contact)) {
        errors.phoneNumber = "Must be a valid 10-digit phone number";
      }

      if (!data.password) {
        errors.password = "Password is required";
      }
      if (!passwordRegex.test(data.password)) {
        errors.password =
          "Password must be at least 8 characters long and must contain atleast - \n \u2022 one uppercase letter \n \u2022 one lowercase letter \n \u2022 one number \n \u2022 one special character";
      }

      return errors;
    }

    const validationErrors = validateRegistrationData(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log(userData);
        // register(userData);
      } catch (error) {
        console.log(error);
      }
    }
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
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
              }}
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
            error={errors.fullName}
          />
          {errors && <ErrorView error={errors.fullName} />}
          <MyTextInput
            placeholderText={"Email"}
            icon={"mail"}
            isEmail={true}
            onChangeText={setEmail}
            error={errors.email}
          />
          {errors && <ErrorView error={errors.email} />}
          <MyTextInput
            placeholderText={"Phone Number"}
            icon={"smartphone"}
            onChangeText={setPhoneNumber}
            isNum={true}
            error={errors.phoneNumber}
          />
          {errors && <ErrorView error={errors.phoneNumber} />}
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
                <GenderDropDown
                  onChangeText={setGender}
                  error={errors.gender}
                />
              </View>
              {errors && <ErrorView error={errors.gender} />}
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
                  error={errors.age}
                />
              </View>
              {errors && <ErrorView error={errors.age} />}
            </View>
          </View>
          <MyTextInput
            placeholderText={"Password"}
            icon={"lock"}
            isPassword={true}
            onChangeText={setPassword}
          />
          {errors && <ErrorView error={errors.password} />}
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

const ErrorView = ({ error }) => {
  console.log(error);
  return (
    <View
      style={{
        justifyContent: "flex-start",
        paddingBottom: 10,
        width: wp(80),
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: hp(-1),
        marginBottom: hp(0.5),
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
  error: {
    color: theme.colors.error,
  },
});
