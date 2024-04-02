import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { router } from "expo-router";
import { theme } from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";

const Header = ({ title, route }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          paddingTop: "20%",
          paddingBottom: "2%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Entypo
              name="chevron-left"
              size={hp("4%")}
              color={theme.colors.text}
            />
          </TouchableOpacity>

          <View style={styles.rightContainer}>
            <Text style={{ fontSize: hp(2.5), fontWeight: "600" }}>
              {title}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    paddingLeft: wp(5),
    gap: wp(5),
  },
  rightContainer: {
    flexDirection: "row",
    gap: wp(10),
    paddingRight: wp(9),
    alignItems: "center",
  },
});
