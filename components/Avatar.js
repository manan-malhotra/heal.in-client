import { Image, StyleSheet, View } from "react-native";
import React from "react";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";

const Avatar = ({ userId, gender, role }) => {
    console.log(userId + " " + gender + " " + role);
    return (
        <Image
            source={{
                uri: `https://raw.githubusercontent.com/manan-malhotra/heal.in-client/test/assets/avatars/${
                    role?.toLowerCase() === "doctor" ? "doctor" : ""
                }${gender?.toLowerCase() === "male" ? "male" : "female"}/${
                    userId % 7
                }.png`,
            }}
            style={styles.avatar}
        />
    );
};

export default Avatar;

const styles = StyleSheet.create({
    avatar: {
        width: "100%",
        height: "100%",
    },
});
