import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../../context/authcontext";
import AddTestCards from "../../../components/AddTestCards";
import Title from "../../../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
const data = [
    {
        test_id: 1,
        test_name: "ADHD",
    },
    {
        test_id: 2,
        test_name: "Anxiety",
    },
    {
        test_id: 3,
        test_name: "Depression",
    },
];
const Assessment = () => {
    useEffect(() => {
        getTestScores();
    });
    const getTestScores = async () => {
        // try {
        //     const ADHD = await AsyncStorage.getItem("ADHD");
        //     setADHD(ADHD);
        //     const Anxiety = await AsyncStorage.getItem("Anxiety");
        //     setAnxiety(Anxiety);
        //     const Depression = await AsyncStorage.getItem("Depression");
        //     setDepression(Depression);
        // } catch (error) {
        //     console.log(error);
        // }
    };
    const user = useLocalSearchParams();
    const handleTest = (testName) => {
        // score = undefined;
        // if (testName == "ADHD") {
        //     score = ADHD;
        // } else if (testName == "Depression") {
        //     score = Depression;
        // } else if (testName == "Anxiety") {
        //     score = Anxiety;
        // }
        // if (score == undefined) {
        //     router.push("./assessment/" + testName);
        // } else {
        //     router.push({
        //         pathname: "./assessment/scoreCard",
        //         params: { sum: score, total: 7 * 3, test: testName },
        //     });
        // }
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
            {data.map((item) => (
                <Pressable
                    onPress={() => handleTest("ADHD")}
                    key={item.test_id}
                >
                    <AddTestCards
                        testName={item.test_name}
                        iconName={item.test_id - 1}
                    />
                </Pressable>
            ))}
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
