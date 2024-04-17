import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const checkAuthentication = async () => {
            if (typeof isAuthenticated == "undefined") router.replace("signIn");
            if (isAuthenticated) {
                if (user == null || user.role == "") {
                    router.replace("signIn");
                } else {
                    let route = user.role.toLowerCase();
                    router.replace({
                        pathname: "/locked/",
                        params: user,
                    });
                    // router.replace({
                    //     pathname: "/" + route + "/",
                    //     params: user,
                    // });
                }
            } else {
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
