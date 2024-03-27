import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    Pressable,
    Platform,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import entriesData from "../../data/journal_entries.json";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTextInput from "../../components/TextInput";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

const Journal = () => {
    const router = useRouter();
    const [entries, setEntries] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [entryId, setEntryId] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(10);
    const [edited, setEdited] = useState(false);
    const getJournalEntries = async () => {
        try {
            const id = await AsyncStorage.getItem("userId");
            const response = await axios.get(
                process.env.API_HOST + "/api/journal/findAll/" + id
            );
            const journalData = [];
            if (response.status === 200) {
                response.data.map((entry) => {
                    const originalDateString = entry.entry_date;
                    const originalDate = new Date(originalDateString);
                    const monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];

                    const month = monthNames[originalDate.getMonth()];
                    const day = originalDate.getDate();
                    const year = originalDate.getFullYear();
                    const hour = originalDate.getHours();
                    let minute = originalDate.getMinutes();
                    if (minute < 10) {
                        minute = "0" + minute;
                    }
                    const formattedDate = `${month} ${day}, ${year} ${hour}:${minute}`;
                    journalData.push({
                        id: entry.entry_id,
                        title: entry.title,
                        content: entry.description,
                        date: formattedDate,
                    });
                });
                setEntries(journalData);
            }
        } catch (error) {
            console.log(error);
            setEntries(entriesData);
        }
    };
    useEffect(() => {
        console.log(process.env.API_HOST + "t");

        getJournalEntries();
    }, [edited]);

    const gradientColors = [
        "rgba(255,255,255,0.2)",
        "rgba(110,113,254,0.6)",
        "rgba(4,0,207,0.4)",
    ];
    const [expandedIndex, setExpandedIndex] = useState(null);
    const handleSave = async () => {
        if (!title.trim() || !description.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Title and description cannot be empty',
                position: 'top',
                visibilityTime: 3000
            });
            return;
        }        
    
        try {
            const response = await axios.put(
                process.env.API_HOST + "/api/journal/edit",
                {
                    title: title,
                    description: description,
                    entryId: entryId,
                }
            );
            if (response.status === 200) {
                setModalVisible(false);
                getJournalEntries();
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Journal entry saved successfully',
                    position: 'top',
                    visibilityTime: 3000
                });
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to save journal entry',
                position: 'top',
                visibilityTime: 3000
            });
        }
    };    
    const handleViewMore = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleNewEntry = () => {
        router.push("newJournal");
    };

    const handleEdit = (index, id) => {
        setModalVisible(true);
        console.log(entries);
        setDescription(entries[id].content);
        setTitle(entries[id].title);
        setEntryId(index);
        console.log(entryId);
    };
    const handleDelete = (index, id) => {
        console.log("deleting" + index);
        Alert.alert("Are you sure?", "This action cannot be undone.", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => {
                    deleteAPI(index, id);
                },
                style: "destructive",
            },
        ]);
    };
    async function deleteAPI(index, id) {
        try {
            console.log("deleteAPI" + index);
            const response = await axios.delete(
                process.env.API_HOST + "/api/journal/delete/" + index
            );
            console.log(response.status + "RES");
            if (response.status === 200) {
                const newEntries = [...entries];
                newEntries.splice(id, 1);
                console.log(entries.length);
                console.log(newEntries.length);
                setEntries(newEntries);
            }
        } catch (error) {
            console.log(error);
        }
    }
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

    return (
        <>
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <ScrollView>
                    {/* Body */}
                    <View style={styles.body}>
                        {/* Header */}
                        <View style={styles.toppart}>
                            <View style={styles.toppartleft}>
                                <Text style={styles.heading}>
                                    Write your mind down.{"\n"}Clear your
                                    thoughts. {"\n"}The Safest place for your
                                    thoughts.
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
                                Your Entires.
                            </Text>
                            <TouchableOpacity
                                style={styles.newButton}
                                onPress={handleNewEntry}
                            >
                                <Text style={styles.newButtonText}>+ NEW</Text>
                            </TouchableOpacity>
                        </View>

                        {/* General Notes List */}
                        <View>
                            {entries.map((entry, index) => (
                                <View style={styles.blog} key={index}>
                                    <TouchableWithoutFeedback
                                        onPress={() =>
                                            handleEdit(entry.id, index)
                                        }
                                    >
                                        <View style={styles.editContainer}>
                                            <Icon
                                                name="pencil"
                                                size={15}
                                                color="#333"
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        onPress={() =>
                                            handleDelete(entry.id, index)
                                        }
                                    >
                                        <View style={styles.deleteContainer}>
                                            <Icon2
                                                name="delete"
                                                size={15}
                                                color="#f5a"
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text style={styles.title}>
                                        {entry.title}
                                    </Text>
                                    <Text style={styles.author}>
                                        {entry.date}
                                    </Text>
                                    <Text style={styles.content}>
                                        {/* Display only the first few lines of content */}
                                        {expandedIndex === index
                                            ? entry.content
                                            : entry.content.length > 100
                                            ? entry.content.substring(0, 100) +
                                              "......"
                                            : entry.content}
                                        {/* Render "View More" button only if content is longer than 100 characters */}
                                        {entry.content.length > 100 && (
                                            <Text
                                                style={styles.viewMoreButton}
                                                onPress={() =>
                                                    handleViewMore(index)
                                                }
                                            >
                                                {expandedIndex === index
                                                    ? "View Less"
                                                    : " View More"}
                                            </Text>
                                        )}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                    style={styles.modal}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit your Entry</Text>
                        <View style={styles.entryArea}>
                            <MyTextInput
                                placeholderText={
                                    "Title of your journal entry..."
                                }
                                onChangeText={setTitle}
                                value={title}
                            ></MyTextInput>
                            <TextInput
                                placeholder="How was your day?"
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
                                value={description}
                            />
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}> Save </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.buttonText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </Modal>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
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
    toppartright: {
        justifyContent: "top",
        alignItems: "center",
        width: "25%",
        marginRight: 4,
    },
    entryHeading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    heading: {
        fontSize: 15,
        fontWeight: "medium",
        marginBottom: 10,
    },
    editContainer: {
        position: "absolute",
        top: 10,
        right: 15,
        zIndex: 1,
    },
    deleteContainer: { position: "absolute", bottom: 10, right: 15, zIndex: 1 },
    newButton: {
        marginBottom: 10,
        backgroundColor: "green",
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: 5,
    },
    newButtonText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    line: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginTop: 5,
        opacity: 0.2,
    },
    blogList: {
        marginTop: 10,
    },
    blog: {
        marginBottom: 20,
        backgroundColor: "rgba(0,0,255,0.04)",
        borderRadius: 8,
        padding: 20,
        paddingBottom: 30,
        marginBottom: 20,

        position: "relative",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        flex: 1,
    },
    author: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#005B55",
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        fontWeight: "medium",
    },
    date: {
        fontSize: 14,
        fontWeight: "bold",
    },
    viewMoreButton: {
        color: "#005B55",
        position: "absolute",
        fontWeight: "bold",
        bottom: 10,
        right: 10,
    },
    gradient: {
        width: "100%",
        height: "100%",
    },
    textStyle: {
        paddingTop: 100,
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    saveButton: {
        backgroundColor: "blue",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "900",
        opacity: 1,
    },
    modalView: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
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
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    blogInput: {
        backgroundColor: "#F4F4F4",
        width: "100%",
        paddingHorizontal: 12,
        color: "grey",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        // padding: 10,
        marginTop: 20,
        fontSize: 17,
    },
});

export default Journal;
