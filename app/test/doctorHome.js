import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
const DoctorHome = () => {
    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                }}
            >
                <Text>Doctor Home</Text>
            </View>
        </>
    );
};

export default DoctorHome;

const styles = StyleSheet.create({});
