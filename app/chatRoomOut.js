import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs, router } from "expo-router";

const ChatRoom = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Chat Room xyz",
                }}
            />
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                }}
            >
                <Text>ChatRoom</Text>
                <Pressable onPress={() => router.push("doctor/chat")}>
                    <Text>Go back</Text>
                </Pressable>
            </View>
        </>
    );
};

export default ChatRoom;

const styles = StyleSheet.create({});
