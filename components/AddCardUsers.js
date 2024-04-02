import { StyleSheet, TextInput, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React from "react";
import { theme } from "../constants/Colors";
import { Feather } from "@expo/vector-icons";

const AddCardUsers = ({
  name,
  icon,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
}) => {
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
        <TextInput
          placeholder={name}
          style={styles.textInput}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.text,
    backgroundColor: "#fff",
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
  bioInput: {
    height: 100, // Set height for multiline input
  },
});

export default AddCardUsers;
