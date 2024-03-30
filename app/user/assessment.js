import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAuth } from "../../context/authcontext";
const Assessment = () => {
    const { logout } = useAuth();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            <Pressable onPress={() => logout()}>
                <Text>Assessment</Text>
            </Pressable>
        </View>
    );
};

export default Assessment;

const styles = StyleSheet.create({});
