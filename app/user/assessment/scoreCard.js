import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { theme } from "../../../constants/Colors";
import { usePreventRemoveContext } from "@react-navigation/native";

const ScoreCard = () => {
    const { test, sum, total } = useLocalSearchParams();
    const [type, setType] = useState("Severe");
    const nav = useNavigation();
    usePreventRemoveContext();
    useEffect(() => {
        const percent = (sum / total) * 100;
        if (percent < 20) {
            setType("Minimal");
        } else if (percent < 40) {
            setType("Mild");
        } else if (percent < 60) {
            setType("Moderate");
        } else if (percent < 80) {
            setType("Moderately Severe");
        } else if (percent < 100) {
            setType("Severe");
        }
        nav.canGoBack = () => false;
    }, []);

    return (
        <View style={styles.body}>
            <View style={styles.resultCard}>
                <Text style={styles.result}>
                    Your Test Results {"\n"}
                    {test} Test
                </Text>
                <Text style={styles.severity}>
                    {type} {test}
                </Text>
            </View>
            <View style={styles.aboutCard}>
                <Text style={styles.about}>
                    About your score : {sum}/{total}{" "}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.anotherTestCard}
                onPress={() => {
                    router.back();
                    router.push("./" + test);
                }}
            >
                <Text style={styles.anotherTest}>Test Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.anotherTestCard}
                onPress={() => {
                    console.log("Trigger");
                    router.navigate("/user/assessment");
                }}
            >
                <Text style={styles.anotherTest}>Take another Test</Text>
            </TouchableOpacity>
            <View style={styles.summaryCard}>
                <Text style={styles.summary}>
                    Based on your responses, you may have symptoms of{" "}
                    {type.toLowerCase() + " "}
                    {test.toLowerCase()}. This result is not a diagnosis. A
                    doctor or therapist can help you get a diagnosis and/or
                    treatment
                </Text>
            </View>
        </View>
    );
};

export default ScoreCard;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: "5%",
        paddingHorizontal: "5%",
    },
    resultCard: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "5%",
        borderRadius: 10,
        marginTop: "5%",
        minHeight: 150,
        borderColor: theme.colors.button,
        borderWidth: 1,
        alignItems: "center",
        backgroundColor: theme.colors.primary,
    },
    result: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.background,
        textAlign: "center",
    },
    severity: {
        marginTop: "5%",
        fontSize: 30,
        fontWeight: "bold",
        color: theme.colors.background,
        textAlign: "center",
    },
    aboutCard: {
        alignItems: "center",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "5%",
        borderRadius: 10,
        marginTop: "8%",
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    about: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.button,
    },
    anotherTestCard: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "5%",
        borderRadius: 10,
        marginTop: "5%",
        borderColor: theme.colors.primary,
        borderWidth: 1,
        alignItems: "center",
    },
    anotherTest: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.button,
    },
    summaryCard: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "5%",
        borderRadius: 10,
        marginTop: "5%",
        alignItems: "center",
    },
    summary: {
        fontSize: 15,
        fontWeight: "bold",
        color: theme.colors.text,
    },
});
