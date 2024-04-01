import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, headerTitle: "Journals" }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerTintColor: "black",
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name="addJournal"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerTintColor: "black",
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                }}
            />
        </Stack>
    );
};

export default _layout;

const styles = StyleSheet.create({});
