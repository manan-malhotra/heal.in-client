import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";

import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authcontext";

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (typeof isAuthenticated == "undefined") return;
        const inApp = segments[0] == "(app)";
        if (isAuthenticated && !inApp) {
            router.replace("home");
            //rediredt to home
        } else if (isAuthenticated == false) {
            //rediredt to signin
            router.replace("signIn");
        }
    }, [isAuthenticated]);

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
