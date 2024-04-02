import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../../context/authcontext";
import AddTestCards from "../../../components/AddTestCards";
import Title from "../../../components/Title";
const Assessment = () => {
    const { logout } = useAuth();
    const user = useLocalSearchParams();
    const handleTest = (testName) => {
        score = undefined;
        if (testName == "ADHD") {
            score = user.adhdTestScore;
        } else if (testName == "Depression") {
            score = user.depressionTestScore;
        } else if (testName == "Anxiety") {
            score = user.anxietyTestScore;
        }
        if (score == undefined) {
            router.push("./assessment/" + testName);
        } else {
            router.push({
                pathname: "./assessment/scoreCard",
                params: { sum: score, total: 7 * 3, test: testName },
            });
        }
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingTop: "25%",
            }}
        >
            <Title title="Self Assessment Tests" />
            <Pressable onPress={() => handleTest("ADHD")}>
                <AddTestCards testName="ADHD" iconName="0.png" />
            </Pressable>
            <Pressable onPress={() => handleTest("Anxiety")}>
                <AddTestCards testName="Anxiety" iconName="1.png" />
            </Pressable>
            <Pressable onPress={() => handleTest("Depression")}>
                <AddTestCards testName="Depression" iconName="2.png" />
            </Pressable>
            {/* <Pressable onPress={() => router.push("./assessment/Postpartum")}>
                <AddTestCards testName="Postpartum" iconName="3.png" />
            </Pressable>
            <Pressable onPress={() => router.push("./assessment/Health")}>
                <AddTestCards testName="Youth Mental Health" iconName="4.png" />
            </Pressable> */}
        </View>
    );
};

export default Assessment;

const styles = StyleSheet.create({});
