import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../constants/Colors";
import MyTextInput from "../components/TextInput";
import { AuthContext } from "../context/authcontext";
import { useRouter, Link } from "expo-router";
import CustomKeyboardView from "../components/CustomKeyboardView";

export default function SignIn() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    login(email, password);
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
          <MyTextInput
            placeholderText={"Username"}
            icon={"user"}
            isEmail={true}
            onChangeText={setEmail}
          ></MyTextInput>
          <View style={{ padding: hp(1) }}></View>
          <MyTextInput
            placeholderText={"Password"}
            icon={"lock"}
            isPassword={true}
            onChangeText={setPassword}
          ></MyTextInput>
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
});

// import React, { useState, useEffect, useContext } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     Keyboard,
//     KeyboardAvoidingView,
// } from "react-native";
// import Background from "../components/Background";
// import MyTextInput from "../components/TextInput";
// import { useRouter } from "expo-router";
// import { AuthContext } from "../context/authcontext";
// import Toast from "react-native-toast-message";

// export default function SignIn() {
//     const router = useRouter();
//     const { login } = useContext(AuthContext);
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener(
//             "keyboardDidShow",
//             () => {
//                 setKeyboardVisible(true);
//             }
//         );
//         const keyboardDidHideListener = Keyboard.addListener(
//             "keyboardDidHide",
//             () => {
//                 setKeyboardVisible(false);
//             }
//         );

//         // cleanup function
//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     const handleLogin = () => {
//         // Check if email or password is empty
//         if (!email.trim() || !password.trim()) {
//             Toast.show({
//                 type: "error",
//                 text1: "Error",
//                 text2: "Email or Password should not be empty",
//                 position: "top",
//                 visibilityTime: 3000,
//             });
//             return;
//         }

//         login(email, password);
//     };

//     return (
//         <>
//             <View style={styles.container}>
//                 <Background>
//                     <KeyboardAvoidingView
//                         style={[
//                             styles.loginView,
//                             keyboardVisible && { height: "90%" },
//                         ]}
//                     >
//                         <Text style={styles.header}>heal.in</Text>
//                         <View style={styles.emailInputView}>
//                             <MyTextInput
//                                 placeholderText={"Email address"}
//                                 isEmail={true}
//                                 value={email}
//                                 onChangeText={setEmail}
//                             />
//                         </View>
//                         <View style={styles.passwordInputView}>
//                             <MyTextInput
//                                 placeholderText={"Password"}
//                                 isPassword={true}
//                                 value={password}
//                                 onChangeText={setPassword}
//                             />
//                         </View>
//                         <View style={styles.buttonView}>
//                             <TouchableWithoutFeedback onPress={handleLogin}>
//                                 <View style={styles.loginButton}>
//                                     <Text style={styles.buttonText}>Login</Text>
//                                 </View>
//                             </TouchableWithoutFeedback>
//                         </View>
//                         <TouchableOpacity>
//                             <Text style={styles.forgot}>
//                                 Forgot your password?
//                             </Text>
//                         </TouchableOpacity>
//                         <View style={styles.line}></View>
//                         <View style={styles.row}>
//                             <Text style={styles.dontHaveAcc}>
//                                 Don't have an account?
//                             </Text>
//                             <TouchableOpacity>
//                                 <Text
//                                     style={styles.link}
//                                     onPress={() => {
//                                         router.push("signUp");
//                                     }}
//                                 >
//                                     {" "}
//                                     Sign up.
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </KeyboardAvoidingView>
//                 </Background>
//             </View>
//             <Toast />
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     header: {
//         fontSize: 40,
//         fontWeight: "500",
//         color: "#1877F2",
//         paddingTop: 40,
//     },
//     loginView: {
//         width: "80%",
//         maxWidth: 500,
//         height: "70%",
//         maxHeight: 600,
//         backgroundColor: "white",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 10,
//     },
//     row: {
//         flexDirection: "row",
//         marginTop: 4,
//     },
//     forgot: {
//         paddingTop: 10,
//         fontSize: 14,
//         fontWeight: 500,
//         color: "#1877F2",
//     },
//     dontHaveAcc: {
//         paddingTop: 20,
//         fontSize: 18,
//         fontWeight: 500,
//         color: "#1877F2",
//     },
//     link: {
//         paddingTop: 20,
//         paddingBottom: 20,
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#42B72A",
//     },
//     emailInputView: {
//         marginTop: 20,
//         width: "80%",
//     },
//     passwordInputView: {
//         marginTop: 10,
//         width: "80%",
//     },
//     buttonView: {
//         paddingTop: 20,
//         width: "50%",
//         marginTop: 20,
//         borderRadius: 10,
//         overflow: "hidden",
//     },
//     loginButton: {
//         backgroundColor: "#1877F2",
//         paddingVertical: 12,
//         borderRadius: 10,
//         alignItems: "center",
//     },
//     buttonText: {
//         color: "white",
//         fontSize: 18,
//         fontWeight: "bold",
//     },
//     line: {
//         width: "80%",
//         marginTop: 30,
//         height: 1,
//         backgroundColor: "black",
//         marginVertical: 0,
//     },
// });
