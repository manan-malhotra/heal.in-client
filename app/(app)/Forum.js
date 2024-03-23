import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import MyTextInput from "../../components/TextInput";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { router } from "expo-router";

const forum = () => {
    const [blogs, setBlogs] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [role, setRole] = useState("User");

    useEffect(() => {
        // Simulate loading blogs from an API
        const blog = [
            {
                index: 1,
                title: "Sample Blog Title 1",
                author: "John Doe",
                date: "March 20, 2024",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                comments: [
                    {
                        comment_id: 1,
                        user_id: {
                            user_id: 23,
                            first_name: "Manan",
                            last_name: "Malhotra",
                            contact_number: 123456789,
                            age: 23,
                            gender: "Male",
                            depression_test_score: null,
                            anxiety_test_score: null,
                            adhd_test_score: null,
                        },
                        comment: "Test question",
                        comment_date: "2024-03-22T04:32:35.094+00:00",
                    },
                ],
            },
            {
                index: 2,
                title: "Sample Blog Title 2",
                author: "Jane Smith",
                date: "March 21, 2024",
                content:
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...t",
                comments: [
                    {
                        comment_id: 2,
                        user_id: {
                            user_id: 24,
                            first_name: "Alice",
                            last_name: "Johnson",
                            contact_number: 987654321,
                            age: 30,
                            gender: "Female",
                            depression_test_score: null,
                            anxiety_test_score: null,
                            adhd_test_score: null,
                        },
                        comment: "Another test question",
                        comment_date: "2024-03-22T04:35:12.094+00:00",
                    },
                ],
            },
        ];
        setBlogs(blog);
    }, []);

    const handleViewMore = (index) => {
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog, i) =>
                i === index
                    ? { ...blog, expandedContent: !blog.expandedContent }
                    : blog
            )
        );
    };

    const handleAddComment = () => {
        console.log("Add Comment Hit..");
    };

    const handleViewMoreComments = (blogIndex) => {
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog, index) =>
                index === blogIndex
                    ? {
                          ...blog,
                          expandedComments: !blog.expandedComments,
                      }
                    : blog
            )
        );
    };

    const handleReportClick = () => {
        console.log("Report clicked");
    };

    const handleSearch = () => {
        console.log("Searching Hit..");
    };

    const gradientColors = [
        "rgba(255,255,255,0.2)",
        "rgba(110,113,254,0.6)",
        "rgba(4,0,207,0.4)",
    ];

    return (
        <View>
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.title}>
                            <Text style={{ fontSize: 20 }}>Q&A Forum</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.notes}>
                            <Text style={{ fontSize: 12 }}>
                                Please note: Whatever asked here will be visible
                                to the world. Need private guidance?{" "}
                                <TouchableOpacity
                                    style={styles.linkContainer}
                                    onPress={() => {
                                        router.push("/chats");
                                    }}
                                >
                                    <Text style={styles.link}>Click here</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                        {/* <View style={styles.searchBarContainer}>
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Search your problem"
                                onChangeText={handleSearch}
                                value=""
                            />
                            <TouchableOpacity
                                style={styles.searchButton}
                                onPress={() => handleSearch("")}
                            >
                                <Text style={styles.searchButtonText}>
                                    Add Question
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.qnA}>
                            {/* Blog List */}
                            <View style={styles.blogList}>
                                {/* Map through the blogsData array and render each blog */}
                                {blogs.map((blog, index) => (
                                    <View key={index}>
                                        <View style={styles.blog}>
                                            {/*Render Flag Content button for User*/}
                                            {role === "User" && (
                                                <TouchableOpacity
                                                    style={styles.reportButton}
                                                    onPress={() =>
                                                        handleReportClick(
                                                            blog.index
                                                        )
                                                    }
                                                >
                                                    <Icon
                                                        name="flag"
                                                        size={15}
                                                        color="#dd342c"
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            <Text style={styles.blogTitle}>
                                                {blog.title}
                                            </Text>
                                            <Text style={styles.author}>
                                                - {blog.author}
                                            </Text>
                                            <Text>
                                                {blog.expandedContent ||
                                                expandedIndex === index
                                                    ? blog.content
                                                    : blog.content.length > 100
                                                    ? blog.content.substring(
                                                          0,
                                                          100
                                                      ) + "..."
                                                    : blog.content}
                                                {/* Render "View More" button only if content is longer than 100 characters */}
                                                {blog.content.length > 100 && (
                                                    <Text
                                                        style={
                                                            styles.viewMoreButton
                                                        }
                                                        onPress={() =>
                                                            handleViewMore(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        {blog.expandedContent ||
                                                        expandedIndex === index
                                                            ? "View Less"
                                                            : "View More"}
                                                    </Text>
                                                )}
                                            </Text>
                                            <Text style={styles.date}>
                                                {blog.date}
                                            </Text>
                                            <View
                                                style={
                                                    styles.commentButtonContainer
                                                }
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.viewCommentsButton
                                                    }
                                                    onPress={() =>
                                                        handleViewMoreComments(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.viewCommentsButtonText
                                                        }
                                                    >
                                                        {blog.expandedComments
                                                            ? "Hide Comments"
                                                            : "View Comments"}
                                                    </Text>
                                                </TouchableOpacity>
                                                {/* {role === "Responder" && (
                                                    <TouchableOpacity
                                                        style={
                                                            styles.commentButton
                                                        }
                                                        onPress={() =>
                                                            handleAddComment()
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.commentButtonText
                                                            }
                                                        >
                                                            Add Comment
                                                        </Text>
                                                    </TouchableOpacity>
                                                )} */}
                                            </View>
                                            {/* Display comments if expanded */}
                                            {blog.expandedComments && (
                                                <View
                                                    style={
                                                        styles.commentsContainer
                                                    }
                                                >
                                                    {blog.comments.map(
                                                        (
                                                            comment,
                                                            commentIndex
                                                        ) => (
                                                            <View
                                                                key={
                                                                    commentIndex
                                                                }
                                                                style={
                                                                    styles.commentContainer
                                                                }
                                                            >
                                                                <Text
                                                                    style={
                                                                        styles.comment
                                                                    }
                                                                >
                                                                    {
                                                                        comment.comment
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        styles.commentDate
                                                                    }
                                                                >
                                                                    {
                                                                        comment.comment_date
                                                                    }
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        styles.commentAuthor
                                                                    }
                                                                >
                                                                    -{" "}
                                                                    {
                                                                        comment
                                                                            .user_id
                                                                            .first_name
                                                                    }{" "}
                                                                    {
                                                                        comment
                                                                            .user_id
                                                                            .last_name
                                                                    }
                                                                </Text>
                                                            </View>
                                                        )
                                                    )}
                                                </View>
                                            )}
                                            {role === "Responder" && (
                                                <View
                                                    style={
                                                        styles.commentInputContainer
                                                    }
                                                >
                                                    <MyTextInput
                                                        placeholder="Add Comment"
                                                        style={
                                                            styles.commentInput
                                                        }
                                                    />
                                                </View>
                                            )}
                                            {/* Render Add Comment section for Responder */}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};
const styles = StyleSheet.create({
    gradient: {
        width: "100%",
        height: "100%",
    },
    body: {
        marginLeft: "4%",
        marginRight: "4%",
    },
    title: {
        marginTop: "15%",
        marginLeft: "5%",
        marginRight: "5%",
    },
    verticalLine: {
        height: 0.7,
        backgroundColor: "black",
        marginVertical: 5,
    },
    notes: {
        marginLeft: "5%",
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "gray",
        borderRadius: 10,
        marginBottom: "5%",
        marginTop: "5%",
        marginLeft: "5%",
        marginRight: "5%",
    },
    searchBar: {
        flex: 1,
        backgroundColor: "white",
        height: hp(4.4),
        fontSize: 14,
        borderBottomLeftRadius: 11,
        borderTopLeftRadius: 11,
    },
    searchButton: {
        backgroundColor: "green",
        paddingVertical: "1.53%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderBottomRightRadius: 11,
        borderTopRightRadius: 11,
    },
    searchButtonText: {
        color: "white",
        fontWeight: "bold",
        paddingLeft: "2%",
        paddingRight: "2%",
    },
    qnA: {
        flex: 1,
        padding: 10,
    },
    blogList: {
        marginBottom: "15%",
    },
    blog: {
        backgroundColor: "rgba(0,0,255,0.07)",
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
    },
    blogTitle: {
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
    reportButton: {
        position: "absolute",
        top: 15,
        right: 15,
    },
    viewCommentsButton: {
        paddingVertical: "1.53%",
        justifyContent: "left",
        borderRadius: 11,
        marginTop: "2%",
        marginBottom: "2%",
    },
    viewCommentsButtonText: {
        color: "rgb(0, 91, 85)",
        fontWeight: "bold",
    },
    commentButton: {
        paddingVertical: "1%",
        marginLeft: "5%",
    },
    commentButtonText: {
        color: "rgb(0, 91, 85)",
        fontWeight: "bold",
    },
    commentButtonContainer: {
        flexDirection: "row",
        justifyContent: "inside",
        alignItems: "center",
        // marginTop: "2%",
        // marginBottom: "2%",
    },
    commentInputContainer: {
        flexDirection: "row",
        justifyContent: "inside",
        alignItems: "center",
    },
    commentInput: {
        flex: 1,
        backgroundColor: "white",
        height: hp(4),
        fontSize: 14,
        // borderRadius: 11,
    },
    linkContainer: { fontSize: 12, transform: [{ translateY: 2 }] },
    link: {
        fontSize: 12,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
});

export default forum;
