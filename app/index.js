import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function StartPage() {
    return (
        // Loading screen
        <View className="h-full bg-red-200 flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="gray" />
        </View>
    );
}
