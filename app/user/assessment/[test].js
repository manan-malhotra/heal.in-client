import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { theme } from "../../../constants/Colors";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const Test = () => {
    const { test } = useLocalSearchParams();
    const { testId } = useLocalSearchParams();
    const { userId } = useLocalSearchParams();
    const { firstName } = useLocalSearchParams();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [data, setData] = useState([]);
    console.log(testId);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                process.env.API_HOST + "/test/getQuestions/" + testId
            );
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleOptionSelected = (question, option) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [question]: option,
        }));
    };
    const handleSubmit = async () => {
        console.log(selectedOptions);
        const sum = Object.values(selectedOptions).reduce(
            (acc, value) => acc + value,
            0
        );
        const length = Object.keys(selectedOptions).length;
        if (length == data.length) {
            await sendScore(sum);
            router.dismissAll();
            router.push({
                pathname: "./scoreCard",
                params: { sum, total: data.length * 3, test, testId },
            });
            console.log("Username : ", firstName);
            console.log("Test Name : ", test);
             try {
                 const json = {
                    auxTestScoreDTO:{
                        score: sum,
                        total: data.length * 3,
                        testId,
                        userId,
                    },
                    username: firstName,
                    testname: test
                 };
                 const response = await axios.post(
                     process.env.API_HOST + "/test/getEmail",
                     json,
                 );
             } catch (error) {
                 console.log(error);
             }
            
        } else {
            Alert.alert(
                "Incomplete Questions",
                "You have submitted " +
                    length +
                    " out of " +
                    data.length +
                    " options"
            );
        }
    };
    const sendScore = async (sum) => {
        try {
            const json = {
                score: sum,
                total: data.length * 3,
                testId,
                userId,
            };
            const response = await axios.post(
                process.env.API_HOST + "/test/addScores",
                json
            );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: test + " Test",
                    headerShown: true,
                    headerBackTitleVisible: false,
                    headerTintColor: "black",
                    headerShadowVisible: false,
                }}
            />
            <View style={styles.body}>
                {data.length > 0 ? (
                    <ScrollView>
                        {data.map((item, index) => (
                            <View
                                style={styles.questionCard}
                                key={item.question_id}
                            >
                                <Text style={styles.question}>
                                    Q{index + 1}. {item.question}
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity
                                        style={
                                            selectedOptions[
                                                item.question_id
                                            ] === 0
                                                ? styles.selectedOptionCard
                                                : styles.optionCard
                                        }
                                        onPress={() => {
                                            handleOptionSelected(
                                                item.question_id,
                                                0
                                            );
                                        }}
                                    >
                                        <Text
                                            style={
                                                selectedOptions[
                                                    item.question_id
                                                ] === 0
                                                    ? styles.selectedOption
                                                    : styles.option
                                            }
                                        >
                                            {item.option1}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={
                                            selectedOptions[
                                                item.question_id
                                            ] === 1
                                                ? styles.selectedOptionCard
                                                : styles.optionCard
                                        }
                                        onPress={() => {
                                            handleOptionSelected(
                                                item.question_id,
                                                1
                                            );
                                        }}
                                    >
                                        <Text
                                            style={
                                                selectedOptions[
                                                    item.question_id
                                                ] === 1
                                                    ? styles.selectedOption
                                                    : styles.option
                                            }
                                        >
                                            {item.option2}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity
                                        style={
                                            selectedOptions[
                                                item.question_id
                                            ] === 2
                                                ? styles.selectedOptionCard
                                                : styles.optionCard
                                        }
                                        onPress={() => {
                                            handleOptionSelected(
                                                item.question_id,
                                                2
                                            );
                                        }}
                                    >
                                        <Text
                                            style={
                                                selectedOptions[
                                                    item.question_id
                                                ] === 2
                                                    ? styles.selectedOption
                                                    : styles.option
                                            }
                                        >
                                            {item.option3}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={
                                            selectedOptions[
                                                item.question_id
                                            ] === 3
                                                ? styles.selectedOptionCard
                                                : styles.optionCard
                                        }
                                        onPress={() => {
                                            handleOptionSelected(
                                                item.question_id,
                                                3
                                            );
                                        }}
                                    >
                                        <Text
                                            style={
                                                selectedOptions[
                                                    item.question_id
                                                ] === 3
                                                    ? styles.selectedOption
                                                    : styles.option
                                            }
                                        >
                                            {item.option4}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => {
                                handleSubmit();
                            }}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </ScrollView>
                ) : (
                    <>
                        <ActivityIndicator
                            size="large"
                            color={theme.colors.button}
                            style={{ marginTop: "50%" }}
                        />
                    </>
                )}
            </View>
        </>
    );
};

export default Test;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: "5%",
    },
    questionCard: {
        width: "100%",
        borderRadius: 10,
        marginTop: "5%",
    },
    question: {
        fontSize: 20,
        fontWeight: "bold",
        padding: "5%",
    },
    optionCard: {
        width: "40%",
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        margin: "5%",
        marginTop: "2%",
        paddingVertical: "1%",
        paddingHorizontal: "2%",
        borderColor: theme.colors.button,
        borderWidth: 1,
        justifyContent: "center",
    },
    option: {
        padding: "5%",
        color: theme.colors.text,
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
    },
    selectedOptionCard: {
        width: "40%",
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        margin: "5%",
        marginTop: "2%",
        paddingVertical: "1%",
        paddingHorizontal: "2%",
        borderColor: theme.colors.button,
        borderWidth: 1,
        justifyContent: "center",
    },
    selectedOption: {
        padding: "5%",
        color: theme.colors.background,
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
    },
    submitButton: {
        backgroundColor: theme.colors.button,
        borderRadius: 10,
        marginTop: "7%",
        paddingVertical: "2%",
        paddingHorizontal: "5%",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    submitButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: "2%",
    },
});
