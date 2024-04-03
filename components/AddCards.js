import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const AddCards = ({ name, icon, route, data }) => {
  return (
    <Pressable
      onPress={() => {
        const data = { name: name };
        router.push({ pathname: route, params: data });
      }}
    >
      <View
        style={{
          paddingTop: hp(4),
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.background,
            height: hp(10),
            width: wp(82),
            borderRadius: 10,
            borderBlockColor: theme.colors.button,
            borderWidth: 1,
            marginLeft: "auto",
            marginRight: "auto",
            flexDirection: "row",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
          }}
        >
          <View style={styles.leftIconContainer}>
            <View style={styles.leftIconView}>
              <Feather name={icon} size={hp(3)} color="white" />
            </View>
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.name}>
              <Text style={{ fontSize: hp(1.9), fontWeight: "bold" }}>
                {name}
              </Text>
            </View>
          </View>
          <View style={styles.rightIconContainer}>
            <View style={styles.rightIconView}>
              <Feather
                name="arrow-right-circle"
                size={hp(3)}
                color={theme.colors.text}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: "100%",
    height: "100%",
  },
  leftIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "35%",
    overflow: "hidden",
  },
  leftIconView: {
    width: "50%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: theme.colors.button,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "start",
    height: "100%",
    width: "45%",
  },
  name: {
    padding: wp(0.2),
    fontSize: 16,
    fontWeight: "bold",
  },
  rightIconContainer: {
    justifyContent: "center",
    alignItems: "start",
    height: "100%",
    width: "20%",
  },
  rightIconView: {
    width: "60%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default AddCards;
