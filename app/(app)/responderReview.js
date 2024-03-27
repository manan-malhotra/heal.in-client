import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

const ResponderPage = () => {
    function convertJSON(jsonData) {
        // Iterate through each object in the array
        for (let i = 0; i < jsonData.length; i++) {
            // Rename the key from "public_qna_id" to "blog_id"
            const blogIdObj = jsonData[i].public_qna_id;
            jsonData[i].blog_id = { ...blogIdObj };
            delete jsonData[i].public_qna_id;
            // Remove the old key
            if (jsonData[i].blog_id.hasOwnProperty("public_qna_id")) {
                jsonData[i].blog_id.blog_id = jsonData[i].blog_id.public_qna_id;
                delete jsonData[i].blog_id.public_qna_id;
            }
            if (jsonData[i].blog_id.hasOwnProperty("question")) {
                jsonData[i].blog_id.title = jsonData[i].blog_id.question;
                delete jsonData[i].blog_id.question;
            }
            if (jsonData[i].blog_id.hasOwnProperty("added_date")) {
                jsonData[i].blog_id.post_date = jsonData[i].blog_id.added_date;
                delete jsonData[i].blog_id.added_date;
            }
        }
        return jsonData;
    }
    const { type } = useLocalSearchParams();
    const formatDate = (inputDate) => {
        const originalDateString = inputDate;
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
        const formattedDate = `${month} ${day}, ${year}`;
        const date = formattedDate;
        return date;
    };
    const [flaggedBlogs, setFlaggedBlogs] = useState([]);

    const [uniqueBlogCounts, setUniqueBlogCounts] = useState({});

    // Function to count occurrences of each unique blog
    const countBlogOccurrences = (data) => {
        const blogCounts = {};

        // Count occurrences of each blog
        data.forEach((item) => {
            const { blog_id, reason } = item;
            const blogId = blog_id.blog_id.toString(); // Convert to string for consistency
            if (!blogCounts[blogId]) {
                blogCounts[blogId] = {
                    total: 0,
                    reasons: {
                        Spam: 0,
                        Hateful: 0,
                        Irrelevancy: 0,
                        "Aise hi": 0,
                    },
                };
            }
            blogCounts[blogId].total++;
            if (blogCounts[blogId].reasons[reason] === undefined) {
                blogCounts[blogId].reasons[reason] = 1;
            } else {
                blogCounts[blogId].reasons[reason]++;
            }
        });

        return blogCounts;
    };
    const getFlaggedBlogs = async () => {
        try {
            if (type === "Blog") {
                const response = await axios.get(
                    process.env.API_HOST + "/flag/blogs/getAllFlaggedBlogs"
                );
                setFlaggedBlogs(response.data);
            } else {
                const response = await axios.get(
                    process.env.API_HOST +
                        "/flag/publicQNA/getAllFlaggedPublicQNA"
                );
                setFlaggedBlogs(convertJSON(response.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getFlaggedBlogs();
    }, []);
    useEffect(() => {
        console.log(flaggedBlogs.length);
        const counts = countBlogOccurrences(flaggedBlogs);
        setUniqueBlogCounts(counts);
    }, [flaggedBlogs]);

    const handleDelete = async (blogId) => {
        Alert.alert(
            "Are You Sure?",
            "This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        console.log("Deleting blog with ID:", blogId);
                        try {
                            if (type === "Blog") {
                                const response = await axios.delete(
                                    process.env.API_HOST +
                                        "/admin/deleteBlogs/" +
                                        blogId
                                );
                            } else {
                                const response = await axios.delete(
                                    process.env.API_HOST +
                                        "/api/user/deleteQuestion/" +
                                        blogId
                                );
                            }
                            getFlaggedBlogs();
                        } catch (error) {
                            console.log(error);
                        }
                        // Implement delete logic here
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const [expandedBlogIds, setExpandedBlogIds] = useState([]);

    const toggleExpanded = (blogId) => {
        setExpandedBlogIds((prevExpandedIds) =>
            prevExpandedIds.includes(blogId)
                ? prevExpandedIds.filter((id) => id !== blogId)
                : [...prevExpandedIds, blogId]
        );
    };

    const renderDescription = (blogId, description) => {
        const isExpanded = expandedBlogIds.includes(blogId);

        if (description.length > 100 && !isExpanded) {
            const truncatedDescription = `${description.substring(0, 100)}...`;
            return (
                <>
                    <Text>{truncatedDescription}</Text>
                    <TouchableOpacity onPress={() => toggleExpanded(blogId)}>
                        <Text style={styles.viewMoreText}>View More</Text>
                    </TouchableOpacity>
                </>
            );
        } else if (description.length > 100) {
            return (
                <>
                    <Text>{description}</Text>
                    <TouchableOpacity onPress={() => toggleExpanded(blogId)}>
                        <Text style={styles.viewMoreText}>View Less</Text>
                    </TouchableOpacity>
                </>
            );
        } else {
            return <Text>{description}</Text>;
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleMarkOther = (blogId, reason) => {
        // Collect information about users who reported this reason for the blog
        const users = flaggedBlogs
            .filter(
                (item) =>
                    item.blog_id.blog_id.toString() === blogId &&
                    item.reason === reason
            )
            .map((item) => ({
                name: `${item.user_id.first_name} ${item.user_id.last_name}`,
                date: item.flagged_date
                    ? formatDate(item.flagged_date)
                    : "Not flagged",
            }));
        setSelectedUsers(users);
        setSelectedReason(reason);
        setModalVisible(true);
    };

    return (
        <LinearGradient
            colors={[
                "rgba(255,255,255,0.2)",
                "rgba(110,113,254,0.6)",
                "rgba(4,0,207,0.4)",
            ]}
            style={styles.gradient}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.heading}>{type} Review</Text>
                    <View style={styles.line} />
                    {Object.entries(uniqueBlogCounts).map(([blogId, count]) => {
                        const blog = flaggedBlogs.find(
                            (item) => item.blog_id.blog_id.toString() === blogId
                        );
                        if (!blog) return null; // Skip rendering if blog not found
                        return (
                            <View key={blogId} style={styles.blogContainer}>
                                <TouchableOpacity
                                    style={styles.deleteIcon}
                                    onPress={() =>
                                        handleDelete(blog.blog_id.blog_id)
                                    }
                                >
                                    <AntDesign
                                        name="delete"
                                        size={17}
                                        color="red"
                                    />
                                </TouchableOpacity>
                                <Text style={styles.blogTitle}>
                                    {blog.blog_id.title}
                                </Text>
                                <Text style={styles.authorname}>
                                    {blog.blog_id.user_id.first_name}{" "}
                                    {blog.blog_id.user_id.last_name}{" "}
                                </Text>

                                {renderDescription(
                                    blog.id,
                                    blog.blog_id.description
                                )}
                                <Text style={styles.date}>
                                    {formatDate(blog.blog_id.post_date)}
                                </Text>
                                {count.total > 0 && (
                                    <View style={styles.buttonContainer}>
                                        {Object.entries(count.reasons).map(
                                            ([reason, reasonCount]) =>
                                                reasonCount > 0 && (
                                                    <TouchableOpacity
                                                        key={reason}
                                                        onPress={() =>
                                                            handleMarkOther(
                                                                blogId,
                                                                reason
                                                            )
                                                        }
                                                        style={styles.button}
                                                    >
                                                        <Text
                                                            style={
                                                                styles.buttonText
                                                            }
                                                        >
                                                            {reason ==
                                                            "Hateful Content"
                                                                ? "Hate"
                                                                : reason}{" "}
                                                            {reasonCount}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                        )}
                                    </View>
                                )}
                            </View>
                        );
                    })}
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
                <View>
                    <Text style={styles.modalText}>{selectedReason}</Text>
                    <ScrollView>
                        <View style={styles.name}>
                            {selectedUsers.map((user, index) => (
                                <Text
                                    style={styles.name_date}
                                    key={index}
                                >{`${user.name} - ${user.date}`}</Text>
                            ))}
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={{
                            ...styles.openButton,
                            backgroundColor: "#2196F3",
                        }}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    name: {
        justifyContent: "center",
    },
    line: {
        width: "100%",
        height: 2,
        backgroundColor: "#000000",
        marginTop: 5,
        marginBottom: 25,
    },
    authorname: {
        fontWeight: "bold",
        color: "green",
        marginBottom: 8,
        fontSize: 15,
    },
    date: {
        fontWeight: "700",
        color: "green",
        marginBottom: 4,
        fontSize: 14,
    },
    deleteIcon: {
        position: "absolute",
        top: 10,
        right: 7,
        zIndex: 1,
    },
    blogContainer: {
        marginBottom: 30,
        borderWidth: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 11,
        paddingBottom: 10,
        borderRadius: 10,
        borderColor: "black",
    },
    blogTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        flex: 1,
        marginTop: 10,

        // justifyContent: "space-evenly",
    },
    viewMoreText: {
        color: "green",
        fontWeight: "bold",
    },
    buttonText: {
        fontSize: 11,
        color: "black",
        padding: 2,
        padding: 8,
        padingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        // marginRight: 5,
        borderWidth: 1,
        // backgroundColor: "white",
        borderColor: "black",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    name_date: {
        alignItems: "center",
        fontSize: 18,
        marginLeft: 80,
        fontWeight: "bold",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        marginTop: 20,
        marginBottom: 30,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        marginLeft: 140,
        marginRight: 140,
        marginTop: 25,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        marginRight: 5,
        borderRadius: 15,
        backgroundColor: "rgba(80,60,100,0.2)",
    },
});

export default ResponderPage;
