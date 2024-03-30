import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/Colors";
import { formatDate } from "../common/helpers";

const ArticleCard = ({ title, post_date }) => {
    return (
        <View style={styles.articleCard}>
            <View style={styles.articleTitleContainer}>
                <Text style={styles.articleTitle}>{title}</Text>
            </View>
            <View style={styles.articleDateContainer}>
                <Text style={styles.articleDate}>{formatDate(post_date)}</Text>
            </View>
        </View>
    );
};

export default ArticleCard;

const styles = StyleSheet.create({
    articleCard: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "91%",
        height: 120,
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        borderBlockColor: theme.colors.primary,
        borderWidth: 1,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        flexDirection: "row",
    },
    articleTitleContainer: {
        height: "100%",
        width: "65%",
    },
    articleTitle: {
        padding: "8%",
        fontSize: 16,
        fontWeight: "bold",
    },
    articleDateContainer: {
        // backgroundColor: theme.colors.secondary,
        height: "100%",
        width: "35%",
    },
    articleDate: {
        padding: "8%",
        paddingTop: "15%",
        fontSize: 13,
        fontWeight: "600",
        color: theme.colors.primary,
    },
});
