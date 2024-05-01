import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../../constants/Colors";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import MyTextInput from "../../components/TextInput";
import { sendOTP, verifyOTP } from "../../common/otpAPI";
import { AuthContext } from "../../context/authcontext";

export default function numberValidation() {
  const userData = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [attempts, setAttempts] = useState(2);
  const [countDown, setCountDown] = useState(30);
  const [OTPError, setOTPError] = useState(null);
  const { register } = useContext(AuthContext);

  useEffect(() => {
    let timer;
    if (countDown > 0) {
      timer = setInterval(() => {
        setCountDown((prevCountDown) => prevCountDown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countDown]);

  const handleResendOTP = async () => {
    if (attempts > 0) {
      const phNumber = "+91" + userData.contact;
      const response = await sendOTP(phNumber);
      if (
        response.message === "Request failed with status code 500" ||
        response.message === "Request failed with status code 502"
      ) {
        setOTPError("Could not send OTP, try again later");
      } else if (response.message === "OTP sent successfully") {
        setCountDown(30);
        setAttempts((prevAttempts) => prevAttempts - 1);
      } else if (response.message) {
        setOTPError(response.message);
      } else {
        console.error(response.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (code.length === 4) {
      const phoneNumber = "+91" + userData.contact;
      try {
        const response = await verifyOTP(phoneNumber, code);
        if (response && response.message === "OTP verified successfully") {
          try {
            setOTPError(null);
            register(userData);
          } catch (err) {
            console.log(err);
          }
        } else if (
          response &&
          response.message === "Request failed with status code 400"
        ) {
          setOTPError("Incorrect OTP");
        } else if (
          response &&
          (response.message === "Request failed with status code 500" ||
            response.message === "Request failed with status code 502")
        ) {
          setOTPError("Unable to verify OTP. Try again later.");
        } else {
          setOTPError(response.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Please enter a valid 4-digit OTP.");
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
          Enter OTP
        </Text>
      </View>
      <CustomKeyboardView inChat={false}>
        <View style={{ backgroundColor: "white" }}>
          {OTPError && <ErrorView error={OTPError}></ErrorView>}
          <MyTextInput
            placeholderText={"####"}
            icon={"key"}
            isPassword={true}
            onChangeText={setCode}
            isNum={true}
            letterSpacing={15}
            fontSize={30}
          />
        </View>
        <View>
          {attempts > 0 && countDown > 0 ? (
            <Text style={{ textAlign: "center" }}>
              Resend OTP in {countDown} seconds. {attempts} attempts left.
            </Text>
          ) : null}
          {attempts === 0 ? (
            <Text style={{ textAlign: "center" }}>0 attempts remaining.</Text>
          ) : null}
          {countDown === 0 && attempts > 0 ? (
            <TouchableOpacity
              style={{ width: wp(100), alignItems: "center" }}
              onPress={handleResendOTP}
            >
              <Text>Resend OTP</Text>
            </TouchableOpacity>
          ) : null}
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
}

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
