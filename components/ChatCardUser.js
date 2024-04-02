import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const ChatCardUser = ({ id, doctor, user, gender }) => {
  const openChatRoom = () => {
    const data = {
      email: user.email,
      firstName: user.firstName,
      gender: user.gender,
      lastName: user.lastName,
      role: user.role,
      userId: user.userId,
      other_first_name: doctor.user_id.first_name,
      other_last_name: doctor.user_id.last_name,
      other_userId: doctor.user_id.user_id,
    };
    router.push({
      pathname: "/chatRoomOut",
      params: data,
    });
  };
  return (
    <View
      style={{
        paddingTop: hp(4),
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.background,
          height: hp(12),
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
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/manan-malhotra/heal.in-client/test/assets/avatars/${
                  gender === "male" ? "male" : "female"
                }/${id % 7}.png`,
              }}
              style={styles.avatar}
            />
          </View>
        </View>
        <Pressable
          onPress={() => {
            console.log("Chat Card User: ", user);
            const data = {
              doctorId: doctor.user_id.user_id,
              doctorFirstName: doctor.user_id.first_name,
              doctorLastName: doctor.user_id.last_name,
              specialization: doctor.specialization,
              doctorGender: doctor.user_id.gender,
              experience: doctor.experience,
              license_number: doctor.license_number,
              degree: doctor.degree,
              doctorContact: doctor.user_id.contact,
              doctorEmail: doctor.user_id.email,
              doctorAge: doctor.user_id.age,
              userId: user.userId,
              userFirstName: user.firstName,
              userLastName: user.lastName,
              userEmail: user.email,
              userGender: user.gender,
              userAge: user.age,
            };
            router.push({
              pathname: "/user/doctors/doctorDescription",
              params: { ...data },
            });
          }}
        >
          <View
            style={{
              height: hp(12),
              width: wp(42),
              paddingTop: hp(3.2),
              flex: "Column",
            }}
          >
            <View style={styles.name}>
              <Text style={{ fontSize: hp(1.9), fontWeight: "bold" }}>
                Dr. {doctor.user_id.first_name + " " + doctor.user_id.last_name}
              </Text>
            </View>
            <View style={styles.nameDown}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  color: "#ADADAD",
                  fontWeight: "bold",
                }}
              >
                {doctor.specialization}
              </Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.rightIconContainer}>
          <Pressable onPress={() => openChatRoom()}>
            <View style={styles.rightIconView}>
              <Feather
                name="message-circle"
                size={hp(3)}
                color={theme.colors.text}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ChatCardUser;

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
    width: "60%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
    position: "absolute",
    overflow: "hidden",
  },
  name: {
    paddingTop: wp(2),
  },
  nameDown: {
    paddingTop: wp(1),
  },
  iconStyle: {
    width: "100%",
    height: "100%",
  },
  leftIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "30%",
    overflow: "hidden",
  },
  leftIconView: {
    width: "60%",
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
    width: "50%",
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
