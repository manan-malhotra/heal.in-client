import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Background from "../components/Background";
import { theme } from "../constants/Colors";
import MyTextInput from "../components/TextInput";

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Background>
        <View style={styles.loginView}>
          <Text style={styles.header}>heal.in</Text>
          <View style={styles.emailInputView}>
            <MyTextInput placeholderText={"Email address"} />
          </View>
          <View style={styles.passwordInputView}>
            <MyTextInput placeholderText={"Password"} />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.loginButton} onPress={() => console.log("Login pressed")}>
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
              <Text style={styles.link}> Sign up.</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingTop:40,
  },
  loginView: {
    width: "80%",
    maxWidth: 500,
    height: "60%",
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
  dontHaveAcc:{
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
    marginTop:30,
    height: 1,
    backgroundColor: "black",
    marginVertical: 0,
  },
});
