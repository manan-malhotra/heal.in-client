import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { theme } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";
const Journal = () => {
    const { id } = useLocalSearchParams();
    const [entry, setEntry] = useState({});
    useEffect(() => {
        getEntry();
    }, []);
    const getEntry = async () => {
        try {
            const response = await axios.get(
                process.env.API_HOST + "/api/journal/findById/" + id
            );
            if (response.status === 200) {
                setEntry(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = () => {
        router.push({
            pathname: "./addJournal/",
            params: {
                id,
                title: entry.title,
                description: entry.description,
            },
        });
    };
    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                process.env.API_HOST + "/api/journal/delete/" + id
            );
        } catch (error) {
            console.log(error);
        }
        router.push("./");
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this entry?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "Delete",
                    onPress: () => {
                        handleDelete();
                    },
                    style: "destructive",
                },
            ]
        );
    };
    return (
        <View style={styles.body}>
            <View style={styles.heading}>
                <Text style={styles.title}>{entry.title}</Text>
                <View style={styles.options}>
                    <TouchableOpacity
                        onPress={() => {
                            handleEdit();
                        }}
                    >
                        <Icon name="edit-3" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            confirmDelete();
                        }}
                    >
                        <Icon
                            name="trash"
                            size={25}
                            style={{ color: theme.colors.error }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
            </View>
            <ScrollView>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>
                        {entry.description}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Journal;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: "5%",
        paddingTop: "1%",
    },
    heading: {
        marginTop: "5%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        width: "35%",
        marginLeft: "auto",
        height: 30,
        borderRadius: 5,
        justifyContent: "space-evenly",
    },
    line: {
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1,
        width: "100%",
        marginTop: "5%",
        opacity: 0.5,
    },
    description: {
        marginTop: "4%",
        padding: "7%",
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
    },
});
