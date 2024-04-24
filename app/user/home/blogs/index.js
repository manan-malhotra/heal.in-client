import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../../../constants/Colors";
import ArticleCard from "../../../../components/articleCard";
import { router } from "expo-router";
import SearchBar from "../../../../components/searchBar";
import { getAllBlogs } from "../../../../common/userApi";
const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [renderData, setRenderData] = useState(blogData);
  useEffect(() => {
    getBlogData();
  }, []);
  const getBlogData = async () => {
    const response = await getAllBlogs();
    if (response.status === 200) {
      setBlogData(response.data);
      setRenderData(response.data);
    }
  };
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
        <SearchBar
          handleSearch={handleSearch}
          searchText={searchText}
          type="Blogs"
        />
        {renderData.map((blog) => (
          <Pressable
            key={blog.id}
            onPress={() => router.push(`./blogs/${blog.id}`)}
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
  searchBar: {
    height: 150,
  },
});
