import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../constants/Colors";
import Avatar from "../components/Avatar";
import { router, useLocalSearchParams } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../context/authcontext";
const Locked = () => {
    const { logout } = useAuth();
    const passcode = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Please authenticate",
            fallbackLabel: "Enter Passcode",
        });
        if (result.success) {
            let route = user.role.toLowerCase();
            router.replace({
                pathname: "/" + route + "/",
                params: user,
            });
        }
    };
    useEffect(() => {
        passcode();
    }, []);
    const user = useLocalSearchParams();
    return (
        <View style={styles.body}>
            <View style={styles.leftContainer}>
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                ></Image>

                <View style={styles.rightContainer}>
                    <Text
                        style={{
                            fontSize: hp(5),
                            fontWeight: "600",
                            color: theme.colors.button,
                        }}
                    >
                        heal.in
                    </Text>
                </View>
            </View>
            <View style={styles.avatar}>
                <Avatar
                    userId={user.userId}
                    gender={user.gender}
                    role={user.role}
                />
            </View>
            <View
                style={{
                    marginTop: hp(5),
                    height: hp(10),
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Text
                    style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
                >
                    {user.role === "DOCTOR" ? "Dr. " : ""}
                    {user.firstName + " " + user.lastName}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    passcode();
                }}
            >
                <View
                    style={{
                        backgroundColor: theme.colors.background,
                        height: hp(6),
                        width: wp(60),
                        borderRadius: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: theme.colors.button,
                    }}
                >
                    <Text
                        style={{
                            color: theme.colors.button,
                            fontWeight: "600",
                            fontSize: hp(2),
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        Enter Passcode
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                        height: hp(6),
                        width: wp(60),
                        borderRadius: 25,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: hp(2),
                    }}
                >
                    <Icon
                        name="log-out"
                        size={hp(2.5)}
                        color={theme.colors.error}
                    ></Icon>
                    <Text
                        style={{
                            fontSize: hp(1.7),
                            fontWeight: "600",
                            color: theme.colors.error,
                        }}
                    >
                        Log out
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Locked;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginTop: hp(10),
        marginLeft: "auto",
        marginRight: "auto",
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        gap: wp(1),
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    avatar: {
        marginTop: hp(3),
        marginLeft: "auto",
        marginRight: "auto",
        height: hp(11),
        width: wp(24),
        borderRadius: 999,
    },
});
