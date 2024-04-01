import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../constants/Colors";

export default function ChatRoomHeader({ user, router, sentFrom }) {
  if (sentFrom == "Doctors") {
    return (
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerLeft: () => (
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

              <View className="flex-row items-center gap-5">
                <Text style={{ fontSize: hp(2.2), fontWeight: "600" }}>
                  {user.first_name + " " + user.last_name}
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View style={styles.rightContainer}>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="call" size={hp(2.5)} color={"#737373"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="videocam" size={hp(2.6)} color={"#737373"} />
              </TouchableOpacity>
            </View>
          ),
          headerShadowVisible: true,
          headerTintColor: theme.colors.text,
          navigationBarColor: theme.colors.background,
        }}
      />
    );
  } else {
    return (
      <Stack.Screen
        options={{
          headerTitle: "Dr. " + user.first_name + " " + user.last_name,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          navigationBarColor: theme.colors.background,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    gap: wp(5),
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
    gap: wp(10),
  },
  title: {
    fontSize: 24,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },

  patientIcon: {
    width: "20%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
  },
});
