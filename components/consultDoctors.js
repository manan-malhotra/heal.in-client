import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

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
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Dr. Anirudh Gupta
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontStyle: "italic",
                  }}
                >
                  General Physician MBBS {"\n"} 15 years exp.
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
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Dr. Emily Watson
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontStyle: "italic",
                  }}
                >
                  Orthopedics {"\n"} MBBS, MD, 9 years exp.
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
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Dr. Greg Morris
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontStyle: "italic",
                  }}
                >
                  General Physician MBBS {"\n"} 15 years exp.
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
    marginTop: 30,
  },
  consulation_title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  consulation_row: {
    marginLeft: 40,
    marginRight: 40,
    flexDirection: "column",
  },
  consulation_card: {
    backgroundColor: "#FFB68D",
    flexDirection: "row",
    marginTop: 30,
    height: 75,
    marginRight: 10,
    borderRadius: 40,
    marginLeft: 10,
  },
  consulation_inner_card_left: {
    backgroundColor: "#FFFFFF",
    height: 75,
    width: 75,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  consulation_inner_card_right: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  consulation_img: {
    borderRadius: 100,
    width: 70,
    height: 70,
  },
});

export default ConsultDoctors;
