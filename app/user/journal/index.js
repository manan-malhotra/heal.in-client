import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import axios from "axios";
import { getFromStorage } from "../../../common/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Journal = () => {
    const [journalData, setJournalData] = useState([]);
    const [id, setId] = useState();
    useEffect(() => {
        console.log("Backed");
        getId();
        getJournalEntries();
    }, [id]);
    const getId = async () => {
        try {
            const value = await AsyncStorage.getItem("userId");
            setId(value);
        } catch (error) {
            console.log(error);
        }
    };
    const getJournalEntries = async () => {
        try {
            if (id) {
                const response = await axios.get(
                    process.env.API_HOST +
                        "/api/journal/findAll/" +
                        parseInt(id)
                );
                if (response.status === 200) {
                    setJournalData(response.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const formatDate = (inputDate) => {
        const originalDate = new Date(inputDate);
        const date = originalDate.getDate();
        if (date < 10) {
            return "0" + date;
        }
        return date;
    };
    const formatMonth = (inputDate) => {
        const originalDate = new Date(inputDate);
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ];

        return monthNames[originalDate.getMonth()];
    };
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
                    {journalData.map((entry) => (
                        <View style={styles.journalCard} key={entry.entry_id}>
                            <TouchableOpacity
                                onPress={() => {
                                    router.push("./journal/" + entry.entry_id);
                                }}
                                style={styles.journalDate}
                            >
                                <Text style={styles.journalDateText}>
                                    {formatDate(entry.entry_date)}
                                </Text>
                                <Text style={styles.journalMonthText}>
                                    {formatMonth(entry.entry_date)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    router.push("./journal/" + entry.entry_id);
                                }}
                                style={styles.journalTitle}
                            >
                                <Text style={styles.journalTitleText}>
                                    {entry.title}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
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
