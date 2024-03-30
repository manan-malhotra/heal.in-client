import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { theme } from "../../../../constants/Colors";
import { formatDate } from "../../../../common/helpers";
import Icon from "react-native-vector-icons/Feather";
const blogData = [
    {
        blog_id: 10,
        user_id: {
            user_id: 23,
            first_name: "Manan",
            last_name: "Malhotra",
            contact_number: 123456789,
            age: 23,
            gender: "Male",
            depression_test_score: 14,
            anxiety_test_score: 18,
            adhd_test_score: 21,
        },
        title: "COVID-19: The Intersection of Physical and Mental Health",
        description:
            "Explore the benefits of mindfulness and meditation practices for reducing stress and finding inner peace. In today's fast-paced world, it's easy to feel overwhelmed and stressed out. However, by incorporating mindfulness and meditation into your daily routine, you can cultivate a sense of calm and tranquility amidst the chaos. This blog delves into the science behind mindfulness and meditation and highlights their numerous mental and physical health benefits. Whether you're new to mindfulness or a seasoned practitioner, this blog offers valuable insights and practical tips for integrating these practices into your life.",
        post_date: "2024-03-20T14:38:17.170+00:00",
    },
];
const Blog = () => {
    const id = useLocalSearchParams()["id"];
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
            <View style={styles.blogHeader}>
                <Text style={styles.blogTitle}>{blogData[0].title}</Text>
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
                    <Icon
                        style={styles.alertIcon}
                        name="alert-triangle"
                        size={25}
                    />
                </View>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.blogContent}>
                <Text style={styles.blogDescription}>
                    {blogData[0].description}
                </Text>
            </View>
        </View>
    );
};

export default Blog;

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
});
