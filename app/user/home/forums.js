import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { getFromStorage, formatDate } from "../../../common/helpers";
import SearchBar from "../../../components/searchBar";
import { theme } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";
const Forums = () => {
    const [forumData, setForumData] = useState({});
    const [mainData, setMainData] = useState({});
    const [role, setRole] = useState("");
    const [searchText, setSearchText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [commentVisibleId, setCommentVisibleId] = useState([]);
    useEffect(() => {
        getRole();
        getForumData();
    }, []);
    const getForumData = async () => {
        try {
            const response = await axios.get(
                process.env.API_HOST + "/api/user/allQuestions"
            );
            setForumData(response.data);
            setMainData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCommentId = (id) => {
        if (commentVisibleId.includes(id)) {
            setCommentVisibleId(commentVisibleId.filter((item) => item !== id));
        } else {
            setCommentVisibleId([...commentVisibleId, id]);
        }
    };
    const getRole = async () => {
        try {
            const role = await getFromStorage("role");
            setRole(role);
        } catch (error) {
            console.log(error);
        }
    };
    const handleSearch = (text) => {
        setSearchText(text);
        let tempData = [...mainData];
        tempData = tempData.filter((question) =>
            question.question.toLowerCase().includes(text.toLowerCase())
        );
        setForumData(tempData);
    };
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle:
                        role == "RESPONDER" ? "Respond to QnA" : "Forums",
                }}
            />
            <View style={styles.body}>
                <ScrollView>
                    <SearchBar
                        type="Forums"
                        searchText={searchText}
                        handleSearch={handleSearch}
                    />
                    {forumData.length > 0 &&
                        forumData.map((question) => (
                            <View
                                style={styles.card}
                                key={question.public_qna_id}
                            >
                                <Text style={styles.questionText}>
                                    {question.question}
                                </Text>
                                <View style={styles.row}>
                                    <View style={styles.cardDetailsLeft}>
                                        <View style={styles.cardSection}>
                                            <Text style={styles.cardAuthor}>
                                                {question.user_id.first_name}{" "}
                                                {question.user_id.last_name}
                                            </Text>
                                        </View>
                                        <View style={styles.cardDateSection}>
                                            <Text style={styles.cardDate}>
                                                {formatDate(
                                                    question.added_date
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardDetailsRight}>
                                        {role == "USER" && (
                                            <Pressable
                                                onPress={() => {
                                                    setModalVisible(true);
                                                    // setReportIndex(cardData[0].card_id);
                                                }}
                                            >
                                                <Icon
                                                    style={styles.alertIcon}
                                                    name="alert-triangle"
                                                    size={25}
                                                />
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                                {question.comments.length > 0 ? (
                                    <>
                                        <Pressable
                                            onPress={() => {
                                                handleCommentId(
                                                    question.public_qna_id
                                                );
                                            }}
                                        >
                                            <Text style={styles.commentText}>
                                                {commentVisibleId.includes(
                                                    question.public_qna_id
                                                )
                                                    ? "Hide Comments"
                                                    : "Show Comments"}
                                            </Text>
                                        </Pressable>
                                        {commentVisibleId.includes(
                                            question.public_qna_id
                                        ) && (
                                            <>
                                                {question.comments.map(
                                                    (comment) => (
                                                        <View
                                                            style={
                                                                styles.comment
                                                            }
                                                        >
                                                            <View
                                                                style={
                                                                    styles.row
                                                                }
                                                            >
                                                                <View
                                                                    style={
                                                                        styles.commentDetailsLeft
                                                                    }
                                                                >
                                                                    <View
                                                                        style={
                                                                            styles.commentSection
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.commentAuthor
                                                                            }
                                                                        >
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
                                                                </View>
                                                                <View
                                                                    style={
                                                                        styles.commentDetailsRight
                                                                    }
                                                                >
                                                                    <View
                                                                        style={
                                                                            styles.commentDateSection
                                                                        }
                                                                    >
                                                                        <Text
                                                                            style={
                                                                                styles.commentDate
                                                                            }
                                                                        >
                                                                            {formatDate(
                                                                                comment.comment_date
                                                                            )}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View>
                                                                <Text
                                                                    style={
                                                                        styles.commentDescription
                                                                    }
                                                                >
                                                                    {
                                                                        comment.comment
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.noCommentText}>
                                            No comments Yet
                                        </Text>
                                    </>
                                )}
                                {role == "RESPONDER" && (
                                    <>
                                        <View style={styles.verticalLine} />
                                        <View style={styles.newComment}>
                                            <TextInput
                                                placeholder="Add a comment"
                                                placeholderTextColor={
                                                    theme.colors.primary
                                                }
                                                style={styles.commentInput}
                                            />
                                            <Pressable
                                                style={styles.commentButton}
                                            ></Pressable>
                                        </View>
                                    </>
                                )}
                            </View>
                        ))}
                </ScrollView>
            </View>
        </>
    );
};

export default Forums;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: "5%",
    },
    card: {
        marginTop: "5%",
        backgroundColor: theme.colors.background,
        width: "91%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "5%",
        borderRadius: 10,
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    questionText: {
        color: theme.colors.button,
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    row: { flexDirection: "row" },
    cardDetailsLeft: {
        width: "85%",
    },
    cardDetailsRight: {
        justifyContent: "center",
        width: "15%",
    },
    cardSection: {
        paddingTop: "4%",
        // paddingHorizontal: "8%",
    },
    cardAuthor: {
        fontSize: 16,
        fontWeight: "700",
        color: theme.colors.primary,
        marginBottom: 5,
    },
    cardDate: {
        fontSize: 16,
        fontWeight: "700",
        color: theme.colors.primary,
    },
    alertIcon: {
        color: theme.colors.error,
        marginTop: "3%",
        justifyContent: "center",
    },
    commentText: {
        color: theme.colors.button,
        fontSize: 14,
        fontWeight: "700",
        marginTop: "3%",
        justifyContent: "center",
        textTransform: "capitalize",
    },
    noCommentText: {
        color: theme.colors.button,
        fontSize: 12,
        fontWeight: "500",
        marginTop: "3%",
        justifyContent: "center",
        textTransform: "capitalize",
    },
    comment: {
        backgroundColor: "rgba(69,105,144,0.15)",
        borderRadius: 10,
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        marginTop: "3%",
        justifyContent: "center",
    },
    commentDetailsLeft: {
        width: "65%",
    },
    commentDetailsRight: {
        justifyContent: "center",
        alignItems: "flex-end",
        width: "35%",
    },
    commentSection: {
        paddingTop: "4%",
    },
    commentAuthor: {
        fontSize: 12,
        fontWeight: "700",
        color: theme.colors.primary,
        opacity: 0.8,
        marginBottom: 5,
    },
    commentDate: {
        fontSize: 12,
        fontWeight: "700",
        color: theme.colors.primary,
        opacity: 0.8,
    },
    commentDescription: {
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 18,
        opacity: 0.8,
    },
    newComment: {
        borderColor: theme.colors.primary,
        borderWidth: 0.2,
        borderRadius: 10,
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        justifyContent: "center",
    },
    verticalLine: {
        height: 1,
        width: "92%",
        alignSelf: "center",
        opacity: 0.2,
        backgroundColor: "black",
        marginTop: "5%",
        marginBottom: "2%",
    },
});
