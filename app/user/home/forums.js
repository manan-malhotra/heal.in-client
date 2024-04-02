import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { formatDate } from "../../../common/helpers";
import SearchBar from "../../../components/searchBar";
import { theme } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";
import ReportModal from "../../../components/reportModal";
import FloatingButton from "../../../components/floatingButton";
const Forums = () => {
    const [forumData, setForumData] = useState({});
    const [mainData, setMainData] = useState({});
    const [searchText, setSearchText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [commentVisibleId, setCommentVisibleId] = useState([]);
    const [comments, setComments] = useState({});
    const [reportReason, setReportReason] = useState("");
    const [reportIndex, setReportIndex] = useState("");
    const user = useLocalSearchParams();
    useEffect(() => {
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
    const setComment = (id, comment) => {
        const newComments = { ...comments };
        newComments[id] = comment;
        setComments(newComments);
    };
    const handleCommentSend = async (id) => {
        const json = {
            comment: comments[id],
            questionId: id,
            userId: user.userId,
        };
        newComments = { ...comments };
        newComments[id] = "";
        setComments(newComments);
        try {
            const response = await axios.post(
                process.env.API_HOST + "/api/user/comment",
                json
            );
            console.log(response.data);
            getForumData();
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
                        user.role == "RESPONDER" ? "Respond to QnA" : "Forums",
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
                                        {user.role == "USER" && (
                                            <Pressable
                                                onPress={() => {
                                                    setModalVisible(true);
                                                    setReportIndex(
                                                        question.public_qna_id
                                                    );
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
                                                            key={
                                                                comment.comment_id +
                                                                question.public_qna_id
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
                                {user.role == "RESPONDER" && (
                                    <>
                                        <View style={styles.verticalLine} />
                                        <View style={styles.newComment}>
                                            <TextInput
                                                placeholder="Type comment..."
                                                placeholderTextColor={
                                                    theme.colors.primary
                                                }
                                                multiline
                                                style={styles.commentInput}
                                                onChangeText={(text) => {
                                                    setComment(
                                                        question.public_qna_id,
                                                        text
                                                    );
                                                }}
                                                value={
                                                    comments[
                                                        question.public_qna_id
                                                    ]
                                                }
                                            />
                                            <Pressable
                                                style={styles.commentButton}
                                                onPress={() => {
                                                    handleCommentSend(
                                                        question.public_qna_id
                                                    );
                                                }}
                                            >
                                                <Icon
                                                    name="send"
                                                    size={15}
                                                    style={{
                                                        color: theme.colors
                                                            .button,
                                                    }}
                                                />
                                            </Pressable>
                                        </View>
                                    </>
                                )}
                            </View>
                        ))}
                </ScrollView>
                {user.role == "USER" && (
                    <TouchableOpacity
                        onPress={() => {
                            router.push("./newForum");
                        }}
                    >
                        <FloatingButton />
                    </TouchableOpacity>
                )}
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => {
                    setModalVisible(false);
                    setReportReason("");
                    setReportIndex("");
                }}
            >
                <ReportModal
                    currentUserId={user.userId}
                    setModalVisible={setModalVisible}
                    reportIndex={reportIndex}
                    reportReason={reportReason}
                    setReportReason={setReportReason}
                    setReportIndex={setReportIndex}
                    api="qna"
                />
            </Modal>
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
        borderColor: theme.colors.button,
        borderWidth: 0.4,
        borderRadius: 10,
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        justifyContent: "center",
        flexDirection: "row",
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
    commentButton: {
        paddingBottom: "1%",
        justifyContent: "flex-end",
        marginLeft: "auto",
    },
    commentInput: {
        width: "95%",
    },
});
