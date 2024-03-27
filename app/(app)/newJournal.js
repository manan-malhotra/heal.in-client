import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MyTextInput from "../../components/TextInput";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";
import { Keyboard } from "react-native";
import Toast from "react-native-toast-message";

const NewJournal = () => {
    const router = useRouter();
    const gradientColors = [
        "rgba(255,255,255,0.2)",
        "rgba(110,113,254,0.6)",
        "rgba(4,0,207,0.4)",
    ];

    function getFormattedDate() {
        const dateObj = new Date();
        const day = dateObj.getDate();
        const monthIndex = dateObj.getMonth();
        const year = dateObj.getFullYear();
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const monthName = monthNames[monthIndex];
        return `${day} ${monthName} ${year}`;
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topPartVisible, setTopPartVisible] = useState(true);
    const [numberOfLines, setNumberOfLines] = useState(18);
    const [showErrorToast, setShowErrorToast] = useState(false);

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
            const response = await axios.post(
                process.env.API_HOST + "/api/journal",
                {
                    title: title,
                    description: description,
                }
            );
            if (response.status === 200) {
                router.dismissAll();
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Journal entry saved successfully",
                    position: "top",
                    visibilityTime: 3000,
                });
            }
        } catch (error) {
            console.log("Error saving post: " + error);
            console.log(error.data.message);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Failed to save journal entry",
                position: "top",
                visibilityTime: 3000,
            });
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setTopPartVisible(false);
                setNumberOfLines(13);
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

    return (
        <>
            <Toast />
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <ScrollView>
                    <View style={styles.body}>
                        {topPartVisible && (
                            <>
                                <View style={styles.toppart}>
                                    <View style={styles.toppartleft}>
                                        <Text style={styles.heading}>
                                            Write your mind down.{"\n"}Clear
                                            your thoughts. {"\n"}The Safest
                                            place for your thoughts.
                                        </Text>
                                    </View>
                                    <View style={styles.toppartright}>
                                        <Text style={styles.author}>
                                            {getFormattedDate()}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.line}></View>
                                <View style={styles.header}>
                                    <Text style={styles.entryHeading}>
                                        What's on your mind today?
                                    </Text>
                                </View>
                            </>
                        )}
                        <View style={styles.entryArea}>
                            <TextInput
                                label="Title of your journal entry..."
                                value={title}
                                onChangeText={setTitle}
                                style={styles.textInput}
                            />
                            <TextInput
                                label="How was your day?"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                minHeight={
                                    Platform.OS === "ios" && numberOfLines
                                        ? 25 * numberOfLines
                                        : null
                                }
                                maxLength={3000}
                                numberOfLines={numberOfLines}
                                style={[styles.textInput, styles.blogInput]}
                            />
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSave}
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
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    body: {
        flex: 1,
        padding: 20,
    },
    toppart: {
        flexDirection: "row",
    },
    toppartleft: {
        justifyContent: "flex-start",
        width: "80%",
    },
    heading: {
        fontSize: 15,
        fontWeight: "medium",
        marginBottom: 10,
    },
    toppartright: {
        justifyContent: "top",
        alignItems: "center",
        width: "25%",
        marginRight: 4,
    },
    author: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#005B55",
        marginBottom: 5,
    },
    line: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginTop: 5,
        opacity: 0.2,
    },
    entryArea: {
        margin: 10,
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
});

export default NewJournal;
