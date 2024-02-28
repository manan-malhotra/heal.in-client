import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import MyTextInput from "../components/TextInput";
import { useRouter } from "expo-router";
export default function SignIn() {
const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardVisible(false);
      }
    );

    // cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Background>
        <KeyboardAvoidingView style={[styles.loginView, keyboardVisible && { height:"90%" }]}>
          <Text style={styles.header}>heal.in</Text>
          <View style={styles.emailInputView}>
            <MyTextInput placeholderText={"Email address"} isEmail={true}/>
          </View>
          <View style={styles.passwordInputView}>
            <MyTextInput placeholderText={"Password"} isPassword={true} />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => console.log("Login pressed")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>
          <View style={styles.row}>
            <Text style={styles.dontHaveAcc}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.link} onPress={()=>{router.push("signUp")}}> Sign up.</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    fontWeight: "500",
    color: "#1877F2",
    paddingTop: 40,
  },
  loginView: {
    width: "80%",
    maxWidth: 500,
    height: "70%",
    maxHeight: 600,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: 500,
    color: "#1877F2",
  },
  dontHaveAcc: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: 500,
    color: "#1877F2",
  },
  link: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#42B72A",
  },
  emailInputView: {
    marginTop: 20,
    width: "80%",
  },
  passwordInputView: {
    marginTop: 10,
    width: "80%",
  },
  buttonView: {
    paddingTop: 20,
    width: "50%",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  loginButton: {
    backgroundColor: "#1877F2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  line: {
    width: "80%",
    marginTop: 30,
    height: 1,
    backgroundColor: "black",
    marginVertical: 0,
  },
});
