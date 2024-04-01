import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect } from "react";
import { theme } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import axios from "axios";
const Journal = () => {
    useEffect(() => {
        console.log("Backed");
    }, []);
    return (
        <View style={styles.body}>
            <Text style={styles.heading}>My Journal</Text>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.subHeading}>
                        Keep{`\n`}Your Mind Clear
                    </Text>
                </View>
                <View style={styles.journals}>
                    <View style={styles.journalCard}>
                        <TouchableOpacity
                            onPress={() => {
                                router.push("./journal/" + 2);
                            }}
                            style={styles.journalDate}
                        >
                            <Text style={styles.journalDateText}>12</Text>
                            <Text style={styles.journalMonthText}>Mar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                router.push("./journal/" + 2);
                            }}
                            style={styles.journalTitle}
                        >
                            <Text style={styles.journalTitleText}>
                                Feeling Good on a Sunday Evening
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => router.push("./journal/addJournal")}
            >
                <View style={styles.floatingButton}>
                    <Icon name="add-sharp" style={styles.floatingButtonIcon} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Journal;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: "20%",
        paddingHorizontal: "5%",
    },
    heading: {
        fontSize: 25,
        fontWeight: "bold",
        color: theme.colors.button,
    },
    header: {
        marginTop: "5%",
        marginBottom: "5%",
        flexDirection: "row",
        alignItems: "center",
        width: "60%",
    },
    subHeading: {
        fontSize: 45,
        fontWeight: "bold",
        color: "black",
        letterSpacing: 1.5,
    },
    journals: {
        height: "75%",
        flexDirection: "column",
    },
    journalCard: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        backgroundColor: theme.colors.background,
        marginVertical: 10,
        flexDirection: "row",
    },
    journalDate: {
        width: "20%",
        backgroundColor: theme.colors.button,
        borderRadius: 10,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        justifyContent: "center",
    },
    journalDateText: {
        color: "white",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "7%",
        paddingTop: "10%",
        fontSize: 25,
        fontWeight: "bold",
    },
    journalMonthText: {
        color: "white",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 20,
        fontWeight: "600",
        paddingBottom: "17%",
    },
    journalTitle: {
        width: "70%",
        marginLeft: "auto",
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        padding: "5%",
        justifyContent: "center",
    },
    journalTitleText: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "capitalize",
        justifyContent: "center",
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.button,
    },
    floatingButtonIcon: {
        color: "white",
        fontSize: 30,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
    },
});
