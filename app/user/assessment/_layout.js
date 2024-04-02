import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const _layout = () => {
    const user = useLocalSearchParams();
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
                initialParams={user}
            />
            <Stack.Screen name="[test]" initialParams={user} />
            <Stack.Screen
                name="scoreCard"
                options={{
                    headerShown: true,
                    headerTitle: "Score Card",
                    headerBackTitleVisible: false,
                    headerTintColor: "black",
                    headerShadowVisible: false,
                    headerBackVisible: true,
                }}
            />
        </Stack>
    );
};

export default _layout;
