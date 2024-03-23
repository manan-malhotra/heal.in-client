import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
} from "react-native";
import blogsData from "../../data/blog_content.json";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReportModal from "../../components/reportModal";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reportIndex, setReportIndex] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setCurrentUserId(await AsyncStorage.getItem("userId"));
                const response = await axios.get(
                    process.env.API_HOST + "/admin/getAllBlogs"
                );
                const blog = response.data;
                const blogDatas = [];
                blog.map((blog) => {
                    const index = blog.blog_id;
                    const title = blog.title;
                    const author =
                        blog.user_id.first_name + " " + blog.user_id.last_name;
                    const originalDateString = blog.post_date;
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
                    const content = blog.description;
                    blogDatas.push({
                        index,
                        title,
                        author,
                        date,
                        content,
                    });
                });
                setBlogs(blogDatas);
            } catch (error) {
                // Handle error
                console.log(error);
                setBlogs(blogsData);
            }
        };
        loadBlogs();
    }, []);

    const [expandedIndex, setExpandedIndex] = useState(null);
    const handleReport = async () => {
        try {
            console.log(reportIndex);
            console.log(reportReason);
            console.log(currentUserId);
            const response = await axios.post(
                process.env.API_HOST + "/flag/blogs/addFlaggedBlogs",
                {
                    blog_id: reportIndex,
                    reason: reportReason,
                    user_id: currentUserId,
                }
            );
        } catch (error) {
            console.log(error);
        }
    };
    const handleViewMore = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleReportClick = (index) => {
        // Handle report click action here
        console.log("Report clicked for index: " + index);
        setModalVisible(true);
        setReportIndex(index);
    };
    const handleReportReason = (text) => {
        if (reportReason.includes(text)) {
            setReportReason("");
        } else {
            setReportReason(text);
        }
    };

    const gradientColors = [
        "rgba(255,255,255,0.2)",
        "rgba(110,113,254,0.6)",
        "rgba(4,0,207,0.4)",
    ];

    return (
        <>
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <ScrollView>
                    {/* Body */}
                    <View style={styles.body}>
                        <Text style={styles.heading}>Our Blogs</Text>

                        {/* Blog List */}
                        <View style={styles.blogList}>
                            {/* Map through the blogsData array and render each blog */}
                            {blogs.map((blog, index) => (
                                <View style={styles.blog} key={index}>
                                    <Text style={styles.title}>
                                        {blog.title}
                                    </Text>
                                    <Text style={styles.author}>
                                        - {blog.author}
                                    </Text>
                                    <Text>
                                        {/* Display only the first few lines of content */}
                                        {expandedIndex === index
                                            ? blog.content
                                            : blog.content.length > 100
                                            ? blog.content.substring(0, 100) +
                                              "......"
                                            : blog.content}
                                        {/* Render "View More" button only if content is longer than 100 characters */}
                                        {blog.content.length > 100 && (
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
                                    <Text style={styles.date}>{blog.date}</Text>
                                    <TouchableOpacity
                                        style={styles.reportButton}
                                        onPress={() =>
                                            handleReportClick(blog.index)
                                        }
                                    >
                                        <Icon
                                            name="flag"
                                            size={15}
                                            color="#dd342c"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
            <Modal
                visible={modalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => {
                    setModalVisible(false);
                    setReportReason("");
                    setReportIndex("");
                }}
                style={styles.modal}
            >
                <ReportModal
                    currentUserId={currentUserId}
                    setModalVisible={setModalVisible}
                    reportIndex={reportIndex}
                    reportReason={reportReason}
                    setReportReason={setReportReason}
                    setReportIndex={setReportIndex}
                    api="Blogs"
                />
                {/* <View style={styles.modalView}>
                    <Text style={styles.modalText}>Report</Text>
                    <Text style={styles.modalInnerText}>
                        We understand your concerns. Please select the reason
                        for reporting.
                    </Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={
                                reportReason.includes("Hateful")
                                    ? styles.modalButtonDisabled
                                    : styles.modalButton
                            }
                            onPress={() =>
                                handleReportReason("Hateful Content")
                            }
                        >
                            <Text style={styles.options}>Hateful Content</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                reportReason.includes("Irrelevancy")
                                    ? styles.modalButtonDisabled
                                    : styles.modalButton
                            }
                            onPress={() => handleReportReason("Irrelevancy")}
                        >
                            <Text style={styles.options}>Irrelevancy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                reportReason.includes("Spam")
                                    ? styles.modalButtonDisabled
                                    : styles.modalButton
                            }
                            onPress={() => handleReportReason("Spam")}
                        >
                            <Text style={styles.options}>Spam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={
                                reportReason.includes("Other")
                                    ? styles.modalButtonDisabled
                                    : styles.modalButton
                            }
                            onPress={() => handleReportReason("Other")}
                        >
                            <Text style={styles.options}>Other</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => {
                                console.log("Reported");
                                handleReport();
                                Alert.alert(
                                    "Reported",
                                    "Your report has been submitted. We will review it and take appropriate action."
                                );
                                setReportIndex("");
                                setReportReason("");
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.options}>Report</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    blogList: {
        marginTop: 10,
    },
    blog: {
        marginBottom: 20,
        backgroundColor: "rgba(0,0,255,0.07)",
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
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
        color: "#005B55",
        marginTop: 10,
    },
    viewMoreButton: {
        color: "#005B55",
        position: "absolute",
        fontWeight: "bold",
        bottom: 10,
        right: 10,
    },
    viewMore: {
        color: "green",
    },
    reportButton: {
        position: "absolute",
        bottom: 8,
        right: 8,
    },
    report: {
        color: "#ff3131",
        fontSize: 5,
        fontWeight: "bold",
        marginTop: 10,
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    modalInnerText: {
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
    },
    modalView: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    modalButton: {
        backgroundColor: "gray",
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 8,
    },
    modalButtonDisabled: {
        backgroundColor: "black",
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 8,
    },
    options: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    submitButton: {
        backgroundColor: "red",
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 88,
    },
});

export default BlogPage;
