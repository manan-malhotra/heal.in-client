import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Modal,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { theme } from "../../../../constants/Colors";
import { formatDate } from "../../../../common/helpers";
import Icon from "react-native-vector-icons/Feather";
import { getBlogById } from "../../../../common/userApi";
import { ActivityIndicator } from "react-native-paper";
import ReportModal from "../../../../components/reportModal";
import { getFromStorage } from "../../../../common/helpers";
const BlogIndividual = () => {
    const id = useLocalSearchParams()["id"];
    const [blogData, setBlogData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reportIndex, setReportIndex] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");

    useEffect(() => {
        getBlogData(id);
        getCurrentId();
    }, []);
    const getBlogData = async (id) => {
        const response = await getBlogById(id);
        if (response.status === 200) {
            const array = [];
            array.push(response.data);
            setBlogData(array);
        }
    };
    const getCurrentId = async () => {
        try {
            const id = await getFromStorage("userId");
            setCurrentUserId(id);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.body}>
            <Stack.Screen
                options={{
                    headerTitle: "",
                    // headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTintColor: "black",
                }}
            />
            {blogData.length !== 0 && (
                <>
                    <View style={styles.blogHeader}>
                        <Text style={styles.blogTitle}>
                            {blogData[0].title}
                        </Text>
                    </View>
                    <View style={styles.blogDetails}>
                        <View style={styles.blogDetailsLeft}>
                            <View style={styles.blogSection}>
                                <Text style={styles.blogAuthor}>
                                    {blogData[0].user_id.first_name}{" "}
                                    {blogData[0].user_id.last_name}
                                </Text>
                            </View>
                            <View style={styles.blogSection}>
                                <Text style={styles.blogDate}>
                                    {formatDate(blogData[0].post_date)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.blogDetailsRight}>
                            <Pressable
                                onPress={() => {
                                    setModalVisible(true);
                                    setReportIndex(blogData[0].blog_id);
                                }}
                            >
                                <Icon
                                    style={styles.alertIcon}
                                    name="alert-triangle"
                                    size={25}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.verticalLine} />
                    <ScrollView style={styles.blogContent}>
                        <Text style={styles.blogDescription}>
                            {blogData[0].description}
                        </Text>
                    </ScrollView>
                </>
            )}
            {blogData.length === 0 && (
                <>
                    <ActivityIndicator
                        size="large"
                        color={theme.colors.button}
                        style={{ marginTop: "50%" }}
                    />
                </>
            )}
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
                    api="blogs"
                />
            </Modal>
        </View>
    );
};

export default BlogIndividual;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: "5%",
    },
    blogHeader: {
        marginHorizontal: 10,
        marginTop: 10,
        fontWeight: "bold",
        height: 110,
    },
    blogTitle: {
        paddingHorizontal: "8%",
        paddingTop: "4%",
        paddingBottom: "2%",
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
    },
    verticalLine: {
        height: 2,
        width: "92%",
        alignSelf: "center",
        opacity: 0.2,
        backgroundColor: "black",
        marginVertical: 5,
    },
    blogDetails: {
        marginHorizontal: 10,
        marginBottom: 5,
        fontWeight: "bold",
        height: "10%",
        flexDirection: "row",
    },
    blogDetailsLeft: {
        width: "85%",
    },
    blogDetailsRight: {
        width: "15%",
    },
    blogSection: {
        paddingHorizontal: "8%",
    },
    blogAuthor: {
        fontSize: 20,
        fontWeight: "700",
        color: theme.colors.primary,
        marginBottom: 5,
    },
    blogDate: {
        fontSize: 18,
        fontWeight: "700",
        color: theme.colors.primary,
    },
    alertIcon: {
        color: theme.colors.error,
        marginTop: "3%",
        justifyContent: "center",
    },
    blogContent: {
        marginHorizontal: 10,
        padding: "8%",
    },
    blogDescription: {
        fontSize: 18,
        fontWeight: "400",
        lineHeight: 23,
    },
    modal: {
        justifyContent: "center",
        alignItems: "center",
    },
});
