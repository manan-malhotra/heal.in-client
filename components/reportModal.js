import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const ReportModal = ({
    currentUserId,
    setModalVisible,
    reportIndex,
    setReportIndex,
    reportReason,
    setReportReason,
    api,
}) => {
    const handleReportReason = (text) => {
        if (reportReason.includes(text)) {
            setReportReason("");
        } else {
            setReportReason(text);
        }
    };
    const handleReport = async () => {
        try {
            console.log(reportIndex);
            console.log(reportReason);
            console.log(currentUserId);
            const response = await axios.post(
                process.env.API_HOST + "/flag/blogs/addFlagged" + api,
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
    return (
        <View style={styles.modalView}>
            <Text style={styles.modalText}>Report</Text>
            <Text style={styles.modalInnerText}>
                We understand your concerns. Please select the reason for
                reporting.
            </Text>
            <View style={styles.modalButtons}>
                <TouchableOpacity
                    style={
                        reportReason.includes("Hateful")
                            ? styles.modalButtonDisabled
                            : styles.modalButton
                    }
                    onPress={() => handleReportReason("Hateful Content")}
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
        </View>
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
export default ReportModal;
