import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const _layout = () => {
    const user = useLocalSearchParams();
    return (
        <Stack>
            <Stack.Screen
                name="index"
                initialParams={user}
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
                initialParams={user}
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
                initialParams={user}
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
            <Stack.Screen
                name="newForum"
                initialParams={user}
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
