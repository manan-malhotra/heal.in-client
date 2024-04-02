import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/authcontext";
const Assessment = () => {
    const { logout } = useAuth();
    const user = useLocalSearchParams();
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
                <Text>{user.firstName}</Text>
            </Pressable>
        </View>
    );
};

export default Assessment;

const styles = StyleSheet.create({});
