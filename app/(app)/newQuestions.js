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
import MyTextInput from "../../components/TextInput";
import { TextInput } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";
import { Keyboard } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export default function newJournal() {
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
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.header}>
                            <Text style={styles.entryHeading}>
                                Add New Question
                            </Text>
                        </View>
                        <View style = {styles.line}></View>
                        <View style={styles.entryArea}>
                            <MyTextInput
                                placeholderText={
                                    "Title of Question"
                                }
                                onChangeText={setTitle}
                            ></MyTextInput>
                            <View style={{}}>
                                <TextInput
                                    placeholder="Add Description"
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
                                    style={styles.blogInput}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
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
        marginTop: heightPercentageToDP(5),
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
        backgroundColor: "#F4F4F4",
        width: "100%",
        paddingHorizontal: 12,
        color: "grey",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        fontSize: 17,
    },
});
