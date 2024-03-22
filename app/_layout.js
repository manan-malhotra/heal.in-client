import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const { role } = useAuth();

    useEffect(() => {
        const checkAuthentication = async () => {
            if (typeof isAuthenticated == "undefined") return;
            const inApp = segments[0] == "(app)";
            if (isAuthenticated && !inApp) {
                console.log("ROLE: ", role);
                if(role == '') {
                    // TODO: Add Toast Messages
                    router.replace("signIn");
                } else if(role == 'DOCTOR') {
                    router.replace("doctorHome");
                } else if(role == 'USER') {
                    router.replace("home");
                }
            } else if (isAuthenticated == false) {
                router.replace("signIn");
            }
        };
        checkAuthentication();
    }, [isAuthenticated, role]);

    const getUserRole = async () => {
        try {
            const value = await AsyncStorage.getItem('role');
            console.log("VALUE : ", value)
            setRole(value);
          } catch(e) {
            console.log(e);
            return '';
          }
    }

    return (
        <View className="h-full">
            <Slot />
        </View>
    );
};

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
    );
}
