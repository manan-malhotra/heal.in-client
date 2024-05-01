import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../../constants/Colors";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import MyTextInput from "../../components/TextInput";
import Header from "../../components/Header";
import axios from "axios";

const EnterEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const sendEmail = async () => {
    setError("");
    try {
      const response = await axios.post(
        process.env.API_HOST + "/api/user/forgotPassword",
        {
          email,
        }
      );
      const data = {
        email,
        otp: response.data,
      };
      router.push({ pathname: "/forgotPassword", params: data });
    } catch (error) {
      console.log(error);
      setError("Email not found");
    }
  };
  return (
    <View style={styles.body}>
      <Header />
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
          Enter Your Email
        </Text>
      </View>
      <CustomKeyboardView inChat={false}>
        <View style={{ backgroundColor: "white" }}>
          {error && <ErrorView error={error} />}
          <MyTextInput
            placeholderText={"Email"}
            icon={"mail"}
            isEmail={true}
            onChangeText={setEmail}
          ></MyTextInput>
        </View>
        <View
          style={{ width: wp(100), alignItems: "center", paddingTop: hp(3) }}
        >
          <TouchableOpacity
            onPress={() => {
              sendEmail();
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
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </CustomKeyboardView>
    </View>
  );
};

export default EnterEmail;

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
