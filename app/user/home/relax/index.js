import { theme } from "../../../../constants/Colors";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const Relax = () => {
  const router = useRouter();
  const { role } = useLocalSearchParams();
  const exerciseData = [
    {
      id: 0,
      path: "Circle",
      name: "Vim Hoff",
    },
    {
      id: 1,
      path: "Square",
      name: "Box Breathing",
    },
    {
      id: 2,
      path: "4-7-8",
      name: "4-7-8",
    },
  ];
  return (
    <>
      <View style={styles.body}>
        <View style={{ alignSelf: "center", marginBottom: "7%" }}>
          <Image
            source={require("../../../../assets/images/meditation.png")}
            style={{
              alignSelf: "center",
              height: heightPercentageToDP(36),
              width: widthPercentageToDP(78),
              opacity: 0.7,
            }}
          />
        </View>
        {exerciseData.map((exercise) => (
          <TouchableOpacity
            key={exercise.id} // Added key prop for React
            style={styles.buttonCard}
            onPress={() => {
              router.push({
                pathname:
                  role.toLowerCase() +
                  `/home/relax/breathing` +
                  `${exercise.path}`,
              });
            }}
          >
            <Text style={styles.button}>{exercise.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default Relax;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonCard: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "5%",
    borderRadius: 10,
    marginTop: "2.5%",
    marginBottom: "5%",
    borderColor: theme.colors.primary,
    borderWidth: 1,
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.button,
  },
});
