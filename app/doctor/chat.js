import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const Chat = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            <Text>Cards to be displayed here</Text>
            <Pressable onPress={() => router.push("chatRoomOut")}>
                <Text>Go to chatroom</Text>
            </Pressable>
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({});
