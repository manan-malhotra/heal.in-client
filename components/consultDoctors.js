import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const ConsultDoctors = () => {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <>
      {/*This the part of Consulatation Part */}

      <View style={styles.consulation}>
        <Text style={styles.consulation_title}>Consult Doctors</Text>
        <View style={styles.consulation_row}>
          <TouchableOpacity
            onPress={() => {
              router.push("chats");
            }}
          >
            <View style={styles.consulation_card}>
              <View style={styles.consulation_inner_card_left}>
                <Image
                  source={require("../assets/images/ConsultDoctor/doctor1.png")}
                  style={styles.consulation_img}
                />
              </View>
              <View style={styles.consulation_inner_card_right}>
                <Text
                  style={styles.infoTitle}
                >
                  Dr. Anirudh Gupta
                </Text>
                <Text
                  style={styles.infoDetails}
                >
                  General Physician MBBS {"\n"}15 years exp.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("chats");
            }}
          >
            <View style={styles.consulation_card}>
              <View style={styles.consulation_inner_card_left}>
                <Image
                  source={require("../assets/images/ConsultDoctor/doctor2.png")}
                  style={styles.consulation_img}
                />
              </View>
              <View style={styles.consulation_inner_card_right}>
                <Text
                  style={styles.infoTitle}
                >
                  Dr. Emily Watson
                </Text>
                <Text
                  style={styles.infoDetails}
                >
                  Orthopedics {"\n"}MBBS, MD, 9 years exp.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("chats");
            }}
          >
            <View style={styles.consulation_card}>
              <View style={styles.consulation_inner_card_left}>
                <Image
                  source={require("../assets/images/ConsultDoctor/doctor3.png")}
                  style={styles.consulation_img}
                ></Image>
              </View>
              <View style={styles.consulation_inner_card_right}>
                <Text
                  style={styles.infoTitle}
                >
                  Dr. Greg Morris
                </Text>
                <Text
                  style={styles.infoDetails}
                >
                  General Physician MBBS {"\n"}15 years exp.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  consulation: {
    marginTop: heightPercentageToDP(3),
  },
  consulation_title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  consulation_row: {
    flexDirection: "column",
  },
  consulation_card: {
    backgroundColor: "#FFB68D",
    flexDirection: "row",
    marginTop: widthPercentageToDP(10),
    alignSelf: "center",
    borderRadius: 40,
  },
  consulation_inner_card_left: {
    backgroundColor: "#FFFFFF",
    height: "auto",
    borderRadius: 100,
  },
  consulation_inner_card_right: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "justify",
    marginLeft: widthPercentageToDP(10),
    marginRight: widthPercentageToDP(10)
  },
  consulation_img: {
    borderRadius: 100,
    width: widthPercentageToDP(18),
    height: heightPercentageToDP(10),
    alignSelf: "flex-start"
  },
  infoTitle:{
    fontSize: 18,
    fontWeight: "bold"
  },
  infoDetails:{
    fontSize: 14,
  }
});

export default ConsultDoctors;
