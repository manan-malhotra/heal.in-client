import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
export default function _layout() {
    return (
        <SafeAreaView>
            <Slot />
        </SafeAreaView>
    );
}
