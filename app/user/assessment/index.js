import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../../context/authcontext";
import AddTestCards from "../../../components/AddTestCards";
import Title from "../../../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Assessment = () => {
    useEffect(() => {
        console.log("TESTINZg..");
        getTestScores();
    });
    const [ADHD, setADHD] = useState();
    const [Depression, setDepression] = useState();
    const [Anxiety, setAnxiety] = useState();
    const getTestScores = async () => {
        try {
            const ADHD = await AsyncStorage.getItem("ADHD");
            setADHD(ADHD);
            const Anxiety = await AsyncStorage.getItem("Anxiety");
            setAnxiety(Anxiety);
            const Depression = await AsyncStorage.getItem("Depression");
            setDepression(Depression);
        } catch (error) {
            console.log(error);
        }
    };
    const user = useLocalSearchParams();
    const handleTest = (testName) => {
        score = undefined;
        if (testName == "ADHD") {
            score = ADHD;
        } else if (testName == "Depression") {
            score = Depression;
        } else if (testName == "Anxiety") {
            score = Anxiety;
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
