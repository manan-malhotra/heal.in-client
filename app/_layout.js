import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const checkAuthentication = async () => {
            // TODO: Add Toast Messages
            if (typeof isAuthenticated == "undefined") return;
            const inApp = segments[0] == "(app)";
            if (isAuthenticated && !inApp) {
                if (user == null || user.role == "") {
                    router.replace("signIn");
                } else if (user.role == "DOCTOR") {
                    router.replace({
                        pathname: "doctorDashboardNavigation",
                        params: user,
                    });
                } else if (user.role == "USER") {
                    router.replace("home");
                } else if (user.role == "ADMIN") {
                    router.replace("adminDashboardNavigation");
                } else {
                    router.replace("responderDashboardNavigation");
                }
            } else if (isAuthenticated == false) {
                router.replace("signIn");
            }
        };
        checkAuthentication();
    }, [isAuthenticated, user]);

    return (
        <View className="h-full">
            <Slot />
        </View>
    );
};

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </SafeAreaProvider>
    );
}
