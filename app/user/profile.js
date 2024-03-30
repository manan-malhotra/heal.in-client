import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/authcontext";

const Profile = () => {
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
                <Text>Profile</Text>
            </Pressable>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({});
