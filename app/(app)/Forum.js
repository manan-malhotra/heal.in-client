import React , { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign } from '@expo/vector-icons';


const Forum = () => {
  const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await axios.get(
                    process.env.API_HOST + "/admin/getAllBlogs"
                );
                const blog = response.data;
                const blogDatas = [];
                blog.map((blog) => {
                    const index = blog.blog_id;
                    const title = blog.title;
                    const author =
                        blog.user_id.first_name + " " + blog.user_id.last_name;
                    const originalDateString = blog.post_date;
                    const originalDate = new Date(originalDateString);

                    const monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];

                    const month = monthNames[originalDate.getMonth()];
                    const day = originalDate.getDate();
                    const year = originalDate.getFullYear();
                    const formattedDate = `${month} ${day}, ${year}`;
                    const date = formattedDate;
                    const content = blog.description;
                    blogDatas.push({
                        index,
                        title,
                        author,
                        date,
                        content,
                    });
                });
                setBlogs(blogDatas);
            } catch (error) {
                // Handle error
                console.log(error);
                setBlogs(blogsData);
            }
        };
        loadBlogs();
    }, []);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleViewMore = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleReportClick = () => {
        // Handle report click action here
        console.log("Report clicked");
    };
    
    const handleSearch = () => {
      console.log("Searching Hit..")
    }
  
  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];
  return (
    <View>
      <LinearGradient colors={gradientColors}  style={styles.gradient}>
        <ScrollView style = {styles.scrollview}>
            <View style = {styles.body}>
                <View style = {styles.title}>
                  <Text style = {{fontSize : 20}}>Q&A Forum</Text>
                </View>
                <View style = {styles.verticalLine}/>
                <View style = {styles.notes}>
                  <Text style = {{fontSize : 12}}>Please note: Whatever asked here will be visible to the world. Need private guidance? Click here</Text>
                </View>
                <View style={styles.searchBarContainer}>
                  <TextInput
                    style={styles.searchBar} // Customize styles based on your desired search bar appearance
                    placeholder="Search your problem"
                    onChangeText={handleSearch}
                    value=""
                  />
                  <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch("")}>
                    <Text style={styles.searchButtonText}>Add Question</Text>
                  </TouchableOpacity>
                </View>
                <View style = {styles.qnA}>
                  <View style={styles.blogList}>
                          {/* Map through the blogsData array and render each blog */}
                          {blogs.map((blog, index) => (
                              <View style={styles.blog} key={index}>
                                  <Text style={styles.blogTitle}>{blog.title}</Text>
                                  <Text style={styles.author}>
                                      - {blog.author}
                                  </Text>
                                  <Text>
                                      {/* Display only the first few lines of content */}
                                      {expandedIndex === index
                                          ? blog.content
                                          : blog.content.length > 100
                                          ? blog.content.substring(0, 100) +
                                            "......"
                                          : blog.content}
                                      {/* Render "View More" button only if content is longer than 100 characters */}
                                      {blog.content.length > 100 && (
                                          <Text
                                              style={styles.viewMoreButton}
                                              onPress={() =>
                                                  handleViewMore(index)
                                              }
                                          >
                                              {expandedIndex === index
                                                  ? "View Less"
                                                  : " View More"}
                                          </Text>
                                      )}
                                  </Text>
                                  <Text style={styles.date}>{blog.date}</Text>
                                  <TouchableOpacity
                                      style={styles.reportButton}
                                      onPress={handleReportClick}
                                  >
                                      <Icon name="flag" size={15} color="#ccc" />
                                  </TouchableOpacity>
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
    width: '100%',
    height: '100%',
  },
  body: {
    marginLeft : '4%',
    marginRight : '4%',
  },
  title: {
    marginTop: "15%",
    marginLeft: "5%",
    marginRight: "5%"
  },

  verticalLine: {
    height: 0.7,
    backgroundColor: 'black', // Change the color of the line as needed
    marginVertical: 5,
  },
  notes: {
    marginLeft: "5%",
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: "5%",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  searchIcon: {
    alignSelf: 'center'
  },
  searchBar: {
    flex:1,
    backgroundColor: 'white',
    height: '2%',
    fontSize: 14,
    borderBottomLeftRadius: 11,
    borderTopLeftRadius: 11,
  },
  searchButton: {
    backgroundColor: 'green',
    paddingVertical:'1.53%',
    justifyContent:'center',
    borderBottomRightRadius: 11,
    borderTopRightRadius: 11,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: '2%',
    paddingRight: '2%'
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
  viewMore: {
      color: "green",
  },
  reportButton: {
      position: "absolute",
      bottom: 8,
      right: 8,
      backgroundColor: "rgba(255,0,0,0.7)",
      paddingVertical: 5,
      paddingHorizontal: 7,
      borderRadius: 8,
      elevation: 5,
  },
  report: {
      color: "#ff3131",
      fontSize: 5,
      fontWeight: "bold",
      marginTop: 10,
  },
});

export default Forum;