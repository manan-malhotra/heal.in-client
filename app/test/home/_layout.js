import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "heal.in",
                    headerStyle: {
                        backgroundColor: "#3340B0",
                    },
                    headerTintColor: "white",
                    navigationBarColor: "#3340B0",
                }}
            />
            <Stack.Screen
                name="selfHelpVideos"
                options={{
                    headerTitle: "",
                    headerShown: false,
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTintColor: "black",
                    navigationBarColor: "#3340B0",
                }}
            />
            <Stack.Screen
                name="blogs/index"
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTintColor: "black",
                    navigationBarColor: "#3340B0",
                }}
            />
        </Stack>
    );
};

export default _layout;
