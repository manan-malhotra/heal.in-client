import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AddTestCards from "../../../components/AddTestCards";
import Title from "../../../components/Title";
import axios from "axios";
const Assessment = () => {
    const [tests, setTests] = useState([]);
    const [score, setScore] = useState([]);
    const user = useLocalSearchParams();
    useEffect(() => {
        getTests();
    }, []);
    const getTests = async () => {
        try {
            const response = await axios.get(
                process.env.API_HOST + "/test/getAll"
            );
            setTests(response.data);
            getTestScores();
        } catch (error) {
            console.log(error);
        }
    };
    const getTestScores = async () => {
        try {
            const response = await axios.get(
                process.env.API_HOST + "/test/getRecentScores/" + user.userId
            );
            console.log(response.data);
            setScore(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTest = (testId, testName) => {
        let total = 0;
        score.forEach((item) => {
            if (item.test_id.test_id === testId) {
                //goto Scorecard
                total = item.total;
                router.push({
                    pathname: "./assessment/scoreCard",
                    params: {
                        sum: item.score,
                        total: item.total,
                        test: item.test_id.test_name,
                        testId,
                    },
                });
            }
        });
        if (total == 0) {
            router.push({
                pathname: "./assessment/" + testName,
                params: { testId },
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
            {tests.map((item, index) => (
                <Pressable
                    onPress={() => handleTest(item.test_id, item.test_name)}
                    key={item.test_id}
                >
                    <AddTestCards testName={item.test_name} iconName={index} />
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
