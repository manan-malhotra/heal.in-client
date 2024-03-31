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
                }}
            />
            <Stack.Screen
                name="blogs/index"
                options={{
                    headerTitle: "Blogs",
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTintColor: "black",
                }}
            />
            <Stack.Screen
                name="forums"
                options={{
                    headerTitle: "Forums",
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTintColor: "black",
                }}
            />
        </Stack>
    );
};

export default _layout;
