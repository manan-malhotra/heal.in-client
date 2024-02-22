import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="home"
                    options={{
                        title: "heal.in",
                        headerStyle:{
                            backgroundColor: "#3340B0"
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
            </Stack>
        </>
    );
}
