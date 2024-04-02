import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/authcontext";
import AddTestCards from "../../components/AddTestCards";
import Title from "../../components/Title";
const Assessment = () => {
    const { logout } = useAuth();
    const user = useLocalSearchParams();
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingTop: "25%",
            }}
        >
            <Title title="Self Assessment Tests" />
            <Pressable onPress={() => logout()}>
                <AddTestCards testName="ADHD" iconName="0.png" />
            </Pressable>
            <Pressable onPress={() => logout()}>
                <AddTestCards testName="Anxiety" iconName="1.png" />
            </Pressable>
            <Pressable onPress={() => logout()}>
                <AddTestCards testName="Depression" iconName="2.png" />
            </Pressable>
            {/* <Pressable onPress={() => logout()}>
                <AddTestCards testName="Postpartum" iconName="3.png" />
            </Pressable>
            <Pressable onPress={() => logout()}>
                <AddTestCards testName="Youth Mental Health" iconName="4.png" />
            </Pressable> */}
        </View>
    );
};

export default Assessment;

const styles = StyleSheet.create({});
