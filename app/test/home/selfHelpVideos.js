import {
    Button,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const SelfHelpVideo = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                height: "100%",
            }}
        >
            <Pressable
                onPress={() => router.back()}
                style={{ position: "absolute", left: 10, top: 40 }}
            >
                <Icon name="chevron-back-outline" size={30} />
            </Pressable>
            <Pressable
                onPress={() => router.push("test/home/blogs")}
                style={{ marginTop: 20 }}
            >
                <Text>Self Help Video Page</Text>
            </Pressable>
        </View>
    );
};

export default SelfHelpVideo;

const styles = StyleSheet.create({});
