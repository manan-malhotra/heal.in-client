import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";
import { Keyboard } from "react-native";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function newJournal() {
    const [topPartVisible, setTopPartVisible] = useState(true);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setTopPartVisible(false);
                setNumberOfLines(10);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setTopPartVisible(true);
                setNumberOfLines(18);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const getUserId = async () => {
        try {
            const value = await AsyncStorage.getItem("userId");
            return value;
        } catch (e) {
            console.log(e);
        }
    };
    const handleSave = async () => {
        if (title.trim() === "" || description.trim() === "") {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Title and description cannot be empty",
                position: "top",
                visibilityTime: 3000,
            });
            return;
        }

        try {
            console.log("Save pressed.");
            const id = await getUserId();
            const response = await axios.post(
                process.env.API_HOST + "/api/user/addQuestion",
                {
                    question: title,
                    description: description,
                    userId: id,
                }
            );
            if (response.status === 200) {
                router.dismissAll();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const router = useRouter();
    const gradientColors = [
        "rgba(255,255,255,0.2)",
        "rgba(110,113,254,0.6)",
        "rgba(4,0,207,0.4)",
    ];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [numberOfLines, setNumberOfLines] = useState(18);

    return (
        <>
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.body}>
                        {topPartVisible && (
                            <View style={styles.topPart}>
                                <View style={styles.header}>
                                    <Text style={styles.entryHeading}>
                                        Add New Question
                                    </Text>
                                </View>
                                <View style={styles.line}></View>
                            </View>
                        )}
                        <View style={styles.entryArea}>
                            <TextInput
                                label="Question Title"
                                value={title}
                                onChangeText={setTitle}
                                style={styles.textInput}
                            />
                            <View style={{}}>
                                <TextInput
                                    label="Add Description"
                                    editable
                                    multiline
                                    numberOfLines={numberOfLines}
                                    minHeight={
                                        Platform.OS === "ios" && numberOfLines
                                            ? 25 * numberOfLines
                                            : null
                                    }
                                    maxLength={3000}
                                    onChangeText={setDescription}
                                    style={[styles.textInput, styles.blogInput]}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => {
                                    handleSave(title, description);
                                }}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
            <Toast />
        </>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    body: {
        flex: 1,
        padding: 20,
        marginLeft: widthPercentageToDP(2),
        marginRight: widthPercentageToDP(2),
    },
    line: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginTop: 5,
        opacity: 0.2,
    },
    entryArea: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
        opacity: 0.65,
        borderRadius: 10,
        flexDirection: "column",
    },
    entryHeading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    saveButton: {
        backgroundColor: "blue",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "900",
        opacity: 1,
    },
    blogInput: {
        marginTop: 20,
    },
    textInput: {
        backgroundColor: "#F4F4F4",
        width: "100%",
        paddingHorizontal: 12,
        color: "grey",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        padding: 10,
        fontSize: 17,
    },
    topPart: { marginBottom: heightPercentageToDP(5) },
});
