import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput as Input, View } from "react-native";
import { theme } from "../constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

export default function MyTextInput({
  icon,
  error,
  placeholderText,
  isPassword,
  isEmail,
  isNum,
  value,
  onChangeText,
  letterSpacing, 
  fontSize=20, 
  ...props
}) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChangeText = (value) => {
    if (isNum) {
      const numericValue = value.replace(/[^0-9]/g, "");
      setText(numericValue);
    } else {
      setText(value);
    }
    if (onChangeText) {
      onChangeText(value);
    }
  };

  return (
    <View
      style={{
        paddingTop: hp(0.7),
        width: wp(80),
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <View style={styles.card}>
        <Feather name={icon} size={22} color="black" style={styles.icon} />
        <Input
          placeholderTextColor="#ADADAD"
          style={[
            styles.formInput,
            { letterSpacing: letterSpacing, fontSize: fontSize },
          ]}
          placeholder={placeholderText}
          secureTextEntry={isPassword}
          keyboardType={
            isEmail ? "email-address" : isNum ? "numeric" : "default"
          }
          autoCapitalize={isEmail ? "none" : "sentences"}
          value={text}
          error={error}
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
  },
  icon: {
    marginRight: wp(4),
    marginLeft: wp(3),
  },

  formInput: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "600",
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
});
