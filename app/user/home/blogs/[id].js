import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
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
        title: "Finding Inner Peace: Mindfulness and Meditation",
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
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "white",
                    },
                    headerTintColor: "black",
                }}
            />
            <Text>Blog {id}</Text>
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
});
