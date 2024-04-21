import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../../../constants/Colors";
import CustomKeyboardView from "../../../components/CustomKeyboardView";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";

const ChangePasswordProfile = () => {
  const data = useLocalSearchParams();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = async () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (password === confirmPassword) {
      if (!passwordRegex.test(password)) {
        setPasswordError(
          "Password must be at least 8 characters long and must contain atleast - \n \u2022 one uppercase letter \n \u2022 one lowercase letter \n \u2022 one number \n \u2022 one special character",
        );
        console.log("Strong Password required");
      } else {
        const response = await axios.post(
          process.env.API_HOST + "/api/user/updatePassword",
          {
            email: data.email,
            currentPassword,
            password,
          },
        );
        console.log("RESPONSE STATUS: ", response.status);
        router.back();
      }
    } else {
      setPasswordError("Passwords do not match");
      console.log("Passwords do not match");
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
              source={require("../../../assets/logo.png")}
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
          Change Password
        </Text>
      </View>
      <CustomKeyboardView inChat={false}>
        <View style={{ backgroundColor: "white" }}>
          <MyTextInput
            placeholderText={"Current Password"}
            icon={""}
            isPassword={true}
            onChangeText={setCurrentPassword}
            isNum={false}
            letterSpacing={1}
            fontSize={20}
          />
        </View>
        {passwordError && <ErrorView error={passwordError} />}
        <View style={{ backgroundColor: "white" }}>
          <MyTextInput
            placeholderText={"Password"}
            icon={""}
            isPassword={true}
            onChangeText={setPassword}
            isNum={false}
            letterSpacing={1}
            fontSize={20}
          />
          <MyTextInput
            placeholderText={"Confirm Password"}
            icon={""}
            isPassword={true}
            onChangeText={setConfirmPassword}
            isNum={false}
            letterSpacing={1}
            fontSize={20}
          />
        </View>
        <View
          style={{ width: wp(100), alignItems: "center", paddingTop: hp(3) }}
        >
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
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
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </CustomKeyboardView>
    </View>
  );
};

export default ChangePasswordProfile;

const ErrorView = ({ error }) => {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        paddingTop: 10,
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
