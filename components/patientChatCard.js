import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const PatientChatCard = ({ id, name, gender }) => {
  return (
    <View style={styles.patientCard}>
      <View style={styles.patientIconContainer}>
        <View style={styles.patientIcon}>
          <Image
            source={{
              uri: `file:///Users/yashtalele/Developer/GitHub/heal.in/heal.in-client/assets/avatars/${
                gender === "Male" ? "female" : "male"
              }/${id % 7}.png`,
            }}
            style={styles.avatar}
          />
        </View>
      </View>
      <View style={styles.patientNameContainer}>
        <Text style={styles.patientName}>{name}</Text>
      </View>
    </View>
  );
};

export default PatientChatCard;

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    height: "100%",
  },
  patientCard: {
    marginLeft: "auto",
    marginRight: "auto",
    width: wp(77),
    height: hp(10),
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    borderBlockColor: theme.colors.primary,
    borderWidth: 1,
    marginVertical: hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    flexDirection: "row",
  },
  patientIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "35%",
    overflow: "hidden",
  },
  patientIcon: {
    width: "60%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
    position: "absolute",
    overflow: "hidden",
  },
  patientNameContainer: {
    justifyContent: "center",
    alignItems: "start",
    height: "100%",
    width: "65%",
  },
  patientName: {
    padding: wp(0.2),
    fontSize: 16,
    fontWeight: "bold",
  },
});
