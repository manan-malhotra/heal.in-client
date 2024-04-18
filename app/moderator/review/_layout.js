import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="[type]"
                options={{
                    headerShown: true,
                    headerTitle: "Reviews",
                    headerBackTitleVisible: false,
                    headerTintColor: "black",
                    headerShadowVisible: false,
                }}
            />
        </Stack>
    );
};

export default _layout;
