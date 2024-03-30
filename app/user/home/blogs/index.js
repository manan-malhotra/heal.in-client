import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useState } from "react";
import { theme } from "../../../../constants/Colors";
import Icon from "react-native-vector-icons/AntDesign";
import ArticleCard from "../../../../components/articleCard";
import { router } from "expo-router";
const blogData = [
    {
        id: 1,
        title: "COVID-19: The Intersection of Physical and Mental Health",
        post_date: "2024-03-20T14:38:17.170+00:00",
    },
    {
        id: 4,
        title: "COVID-19: The Intersection of Physical and Mental Health",
        post_date: "2024-03-20T14:38:17.170+00:00",
    },
    {
        id: 7,
        title: "COVID-19: The Intersection of Physical and Mental Health",
        post_date: "2024-03-28T06:29:30.268+00:00",
    },
    {
        id: 14,
        title: "COVID-191: The Intersection of Physical and Mental Health",
        post_date: "2024-03-20T14:38:17.170+00:00",
    },
    {
        id: 9,
        title: "Finding Inner Peace: Mindfulness and Meditation",
        post_date: "2024-03-20T14:38:17.170+00:00",
    },
];
const Blog = () => {
    const [searchText, setSearchText] = useState("");
    const [renderData, setRenderData] = useState(blogData);
    const handleSearch = (text) => {
        setSearchText(text);
        const filteredData = blogData.filter((video) =>
            video.title.toLowerCase().includes(text.toLowerCase())
        );
        setRenderData(filteredData);
    };
    return (
        <View style={styles.body}>
            <ScrollView>
                <View style={styles.searchBar}>
                    <View style={styles.searchBarIcon}>
                        <Icon
                            name="search1"
                            size={20}
                            style={{ color: theme.colors.primary }}
                        />
                    </View>
                    <View style={styles.searchBarInput}>
                        <TextInput
                            style={styles.searchBarInputText}
                            placeholder="Search Videos"
                            placeholderTextColor={theme.colors.primary}
                            value={searchText}
                            onChangeText={handleSearch}
                        />
                    </View>
                </View>
                {renderData.map((blog) => (
                    <Pressable
                        key={blog.id}
                        onPress={() =>
                            router.push(`/user/home/blogs/${blog.id}`)
                        }
                    >
                        <ArticleCard {...blog} />
                    </Pressable>
                ))}
            </ScrollView>
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
    row: { flexDirection: "row" },
    articleHeader: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: 20,
        color: theme.colors.secondary,
    },
    searchBar: {
        width: "81%",
        height: 50,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
        borderColor: "rgba(69,105,144,0.8)",
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        flexDirection: "row",
    },
    searchBarIcon: {
        width: "15%",
        height: "100%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    searchBarInput: {
        width: "85%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    searchBarInputText: {
        width: "100%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        color: theme.colors.primary,
    },
    articles: {
        height: "75%",
        flexDirection: "column",
    },
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
