import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const AddTestCards = ({ testName, iconName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <View style={styles.innerIcon}>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/manan-malhotra/heal.in-client/test/assets/tests/${iconName}`,
              }}
              style={styles.avatar}
            />
          </View>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{testName}</Text>
      </View>
    </View>
  );
};

export default AddTestCards;

const styles = StyleSheet.create({
  avatar: {
    width: "100%",
    height: "100%",
  },
  card: {
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
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "35%",
    overflow: "hidden",
  },
  icon: {
    width: "55%",
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  innerIcon: {
    width: "65%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "start",
    height: "100%",
    width: "65%",
  },
  name: {
    padding: wp(0.2),
    fontSize: 16,
    fontWeight: "bold",
  },
});
