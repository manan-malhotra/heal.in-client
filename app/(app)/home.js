import { View, Text } from "react-native";
import React from "react";
import BlogPage from "../blog";

export default function home() {
    return (
        <View className="h-full">
            <BlogPage />
        </View>
    );
}
