import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../../constants/Colors";
import MyTextInput from "../../components/TextInput";
import { AuthContext } from "../../context/authcontext";
import { useRouter, Link } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeyboardView";

export default function SignIn() {
  const router = useRouter();
  const { login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleLogin = async () => {
    function validateRegistrationData(email, password) {
      let errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        errors.email = "Email must be a valid email address";
      }
      if (!password) {
        errors.password = "Password cannot be empty";
      }
      return errors;
    }

    const validationErrors = validateRegistrationData(email, password);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await login(email, password);
        const errors = {};
        if (response === 404) {
          errors.email = "Account with that email does not exist.";
        } else if (response === 401) {
          errors.password = "Entered password is wrong.";
        } else if (response === 502) {
          errors.mainError = "Our servers are down. Try again later.";
        }

        setErrors(errors);
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
              source={require("../../assets/logo.png")}
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
          height: hp(10),
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
          LOG IN
        </Text>
      </View>
      <CustomKeyboardView inChat={false}>
        <View style={{ backgroundColor: "white" }}>
          {errors.mainError && <ErrorView error={errors.mainError} />}
          <MyTextInput
            placeholderText={"Username"}
            icon={"user"}
            isEmail={true}
            onChangeText={setEmail}
          ></MyTextInput>
          {errors.email && <ErrorView error={errors.email} />}
          <View style={{ padding: hp(1) }}></View>
          <MyTextInput
            placeholderText={"Password"}
            icon={"lock"}
            isPassword={true}
            onChangeText={setPassword}
          ></MyTextInput>
          {errors.password && <ErrorView error={errors.password} />}
        </View>
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              height: hp(10),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: hp(3),
                width: wp(80),
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <Link href="">Forgot Password?</Link>
            </View>

            <View style={{ padding: hp(1) }}></View>
            <TouchableOpacity
              onPress={() => {
                handleLogin();
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
                  Log in
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
              <Link href="signUp">Don't have an account?</Link>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    </View>
  );
}

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
        paddingTop: hp(1),
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
  error: {
    color: theme.colors.error,
  },
});
