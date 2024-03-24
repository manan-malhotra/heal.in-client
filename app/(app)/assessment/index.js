import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

const assessment = () => {
    const { test } = useLocalSearchParams();
    const sendScore = async (sum) => {
        try {
            const json = {
                score: sum,
                test: test.toLowerCase(),
            };
            console.log(json);
            const response = await axios.post(
                process.env.API_HOST + "/api/user/addScore",
                json
            );
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = async () => {
        const sum = Object.values(selectedOptions).reduce(
            (acc, value) => acc + value,
            0
        );
        const length = Object.keys(selectedOptions).length;
        if (length == questions.length) {
            await sendScore(sum);
            Alert.alert(
                "Test Submitted",
                "Your score is " +
                    sum +
                    " out of " +
                    questions.length * 3 +
                    " points"
            );
            console.log("Sum of selected options:", sum);
        } else {
            Alert.alert(
                "Please complete all questions",
                "You have submitted " +
                    length +
                    " out of " +
                    questions.length +
                    " options"
            );
        }
    };
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    process.env.API_HOST + "/admin/getAll" + test + "Test"
                );
                setQuestions(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const gradientColors = [
        "rgba(255,255,255,0.2)",
        "rgba(110,113,254,0.6)",
        "rgba(4,0,207,0.4)",
    ];

    // State to track selected options
    const [selectedOptions, setSelectedOptions] = useState({});

    // Function to handle option selection
    const handleOptionPress = (questionId, optionIndex) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [questionId]: optionIndex,
        }));
    };

    return (
        <LinearGradient colors={gradientColors} style={styles.gradient}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.heading}>{test} Test</Text>
                    <View style={styles.line}></View>
                    <View style={styles.questionContainer}>
                        <Text style={styles.test}>Test Questions</Text>
                        {test != "ADHD" && (
                            <Text style={styles.questionText}>
                                Over the last 2 weeks, how often have you been
                                bothered by any of the following problems?
                            </Text>
                        )}
                        {test == "ADHD" && (
                            <Text style={styles.questionText}>
                                Please answer the questions below, rating
                                yourself on each of the criteria shown. As you
                                answer each question, select the button that
                                best describes how you have felt and conducted
                                yourself over the past 6 months.
                            </Text>
                        )}
                    </View>
                    {questions.map((question) => (
                        <View
                            key={question.id}
                            style={styles.questionContainer}
                        >
                            <Text style={styles.questionHeading}>
                                {question.question}
                            </Text>
                            <View style={styles.optionsContainer}>
                                {Object.keys(question)
                                    .filter((key) => key.startsWith("option"))
                                    .map((optionKey, optionIndex) => (
                                        <TouchableOpacity
                                            key={optionIndex}
                                            style={[
                                                styles.optionButton,
                                                selectedOptions[question.id] ===
                                                    optionIndex &&
                                                    styles.selectedOption, // Apply style if option is selected
                                            ]}
                                            onPress={() =>
                                                handleOptionPress(
                                                    question.id,
                                                    optionIndex
                                                )
                                            }
                                        >
                                            <Text style={styles.optionText}>
                                                {question[optionKey]}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "rgba(0,0,255,0.07)",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
    },
    line: {
        height: 1,
        backgroundColor: "black",
        marginBottom: 25,
    },
    questionContainer: {
        marginBottom: 20,
    },
    test: {
        fontSize: 20,
        marginBottom: 25,
        fontWeight: "bold",
    },
    questionText: {
        fontSize: 17,
        marginBottom: 10,
    },
    questionHeading: {
        fontSize: 17,
        marginBottom: 20,
        fontWeight: 500,
    },
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    optionButton: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10,
        width: "48%", // Set the width to fit two buttons in a row
    },
    optionText: {
        textAlign: "center",
        fontSize: 12,
    },
    selectedOption: {
        backgroundColor: "#e0f5ae", // Change color to dark yellow when selected
    },
    submitButton: {
        backgroundColor: "green",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 35,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default assessment;
