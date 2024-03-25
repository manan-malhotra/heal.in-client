import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity, Alert, Modal} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import ReportModal from "../../components/reportModal";

const ResponderPage = () => {
  const [searchText, setSearchText] = useState('');
  const [flaggedBlogs, setFlaggedBlogs] = useState([
    // Your data goes here
    {
        "id": 1,
        "user_id": {
            "user_id": 23,
            "first_name": "Manan",
            "last_name": "Malhotra",
            "contact_number": 123456789,
            "age": 23,
            "gender": "Male",
            "depression_test_score": null,
            "anxiety_test_score": null,
            "adhd_test_score": null
        },
        "blog_id": {
            "blog_id": 6,
            "user_id": {
                "user_id": 17,
                "first_name": "Test70",
                "last_name": "T",
                "contact_number": 12341232131,
                "age": 20,
                "gender": "Male",
                "depression_test_score": null,
                "anxiety_test_score": null,
                "adhd_test_score": null
            },
            "title": "Building Resilience: Strategies for Coping with Challenges",
            "description": "Discover effective techniques to build resilience and bounce back from setbacks and adversity. Resilience is the ability to adapt and recover in the face of adversity, and it plays a crucial role in navigating life's challenges. This blog explores various resilience-building strategies, such as cultivating a growth mindset, practicing self-care, and seeking support from others. By developing resilience, individuals can better cope with stress, overcome obstacles, and thrive in the face of adversity. Whether you're facing a personal setback or a professional challenge, this blog provides valuable insights and practical advice for building resilience and facing life's difficulties with strength and courage.",
            "post_date": "2024-03-20T13:45:40.582+00:00"
        },
        "reason": "Aise hi",
        "flagged_date": null
    },
    {
        "id": 2,
        "user_id": {
            "user_id": 23,
            "first_name": "Manan",
            "last_name": "Malhotra",
            "contact_number": 123456789,
            "age": 23,
            "gender": "Male",
            "depression_test_score": null,
            "anxiety_test_score": null,
            "adhd_test_score": null
        },
        "blog_id": {
            "blog_id": 6,
            "user_id": {
                "user_id": 17,
                "first_name": "Test70",
                "last_name": "T",
                "contact_number": 12341232131,
                "age": 20,
                "gender": "Male",
                "depression_test_score": null,
                "anxiety_test_score": null,
                "adhd_test_score": null
            },
            "title": "Building Resilience: Strategies for Coping with Challenges",
            "description": "Discover effective techniques to build resilience and bounce back from setbacks and adversity. Resilience is the ability to adapt and recover in the face of adversity, and it plays a crucial role in navigating life's challenges. This blog explores various resilience-building strategies, such as cultivating a growth mindset, practicing self-care, and seeking support from others. By developing resilience, individuals can better cope with stress, overcome obstacles, and thrive in the face of adversity. Whether you're facing a personal setback or a professional challenge, this blog provides valuable insights and practical advice for building resilience and facing life's difficulties with strength and courage.",
            "post_date": "2024-03-20T13:45:40.582+00:00"
        },
        "reason": "Hateful Content",
        "flagged_date": null
    },
    {
        "id": 3,
        "user_id": {
            "user_id": 23,
            "first_name": "Manan",
            "last_name": "Malhotra",
            "contact_number": 123456789,
            "age": 23,
            "gender": "Male",
            "depression_test_score": null,
            "anxiety_test_score": null,
            "adhd_test_score": null
        },
        "blog_id": {
            "blog_id": 10,
            "user_id": {
                "user_id": 23,
                "first_name": "Som Shiv",
                "last_name": "Gupta",
                "contact_number": 123456789,
                "age": 23,
                "gender": "Male",
                "depression_test_score": null,
                "anxiety_test_score": null,
                "adhd_test_score": null
            },
            "title": "Finding Inner Peace: Mindfulness and Meditation",
            "description": "Explore the benefits of mindfulness and meditation practices for reducing stress and finding inner peace. In today's fast-paced world, it's easy to feel overwhelmed and stressed out. However, by incorporating mindfulness and meditation into your daily routine, you can cultivate a sense of calm and tranquility amidst the chaos. This blog delves into the science behind mindfulness and meditation and highlights their numerous mental and physical health benefits. Whether you're new to mindfulness or a seasoned practitioner, this blog offers valuable insights and practical tips for integrating these practices into your life.",
            "post_date": "2024-03-20T14:38:17.170+00:00"
        },
        "reason": "Hateful Content",
        "flagged_date": null
    },
    {
        "id": 4,
        "user_id": {
            "user_id": 23,
            "first_name": "Jay",
            "last_name": "Manoj Rathod",
            "contact_number": 123456789,
            "age": 23,
            "gender": "Male",
            "depression_test_score": null,
            "anxiety_test_score": null,
            "adhd_test_score": null
        },
        "blog_id": {
            "blog_id": 6,
            "user_id": {
                "user_id": 17,
                "first_name": "Test70",
                "last_name": "T",
                "contact_number": 12341232131,
                "age": 20,
                "gender": "Male",
                "depression_test_score": null,
                "anxiety_test_score": null,
                "adhd_test_score": null
            },
            "title": "Building Resilience: Strategies for Coping with Challenges",
            "description": "Discover effective techniques to build resilience and bounce back from setbacks and adversity. Resilience is the ability to adapt and recover in the face of adversity, and it plays a crucial role in navigating life's challenges. This blog explores various resilience-building strategies, such as cultivating a growth mindset, practicing self-care, and seeking support from others. By developing resilience, individuals can better cope with stress, overcome obstacles, and thrive in the face of adversity. Whether you're facing a personal setback or a professional challenge, this blog provides valuable insights and practical advice for building resilience and facing life's difficulties with strength and courage.",
            "post_date": "2024-03-20T13:45:40.582+00:00"
        },
        "reason": "Irrelevancy",
        "flagged_date": null
    },
    {
      "id": 5,
      "user_id": {
          "user_id": 23,
          "first_name": "Yash",
          "last_name": "Malhotra",
          "contact_number": 123456789,
          "age": 23,
          "gender": "Male",
          "depression_test_score": null,
          "anxiety_test_score": null,
          "adhd_test_score": null
      },
      "blog_id": {
          "blog_id": 6,
          "user_id": {
              "user_id": 17,
              "first_name": "Test70",
              "last_name": "T",
              "contact_number": 12341232131,
              "age": 20,
              "gender": "Male",
              "depression_test_score": null,
              "anxiety_test_score": null,
              "adhd_test_score": null
          },
          "title": "Building Resilience: Strategies for Coping with Challenges",
          "description": "Discover effective techniques to build resilience and bounce back from setbacks and adversity. Resilience is the ability to adapt and recover in the face of adversity, and it plays a crucial role in navigating life's challenges. This blog explores various resilience-building strategies, such as cultivating a growth mindset, practicing self-care, and seeking support from others. By developing resilience, individuals can better cope with stress, overcome obstacles, and thrive in the face of adversity. Whether you're facing a personal setback or a professional challenge, this blog provides valuable insights and practical advice for building resilience and facing life's difficulties with strength and courage.",
          "post_date": "2024-03-20T13:45:40.582+00:00"
      },
      "reason": "Aise hi",
      "flagged_date": null
  },
  ]);

  const [uniqueBlogCounts, setUniqueBlogCounts] = useState({});
  
  // Function to count occurrences of each unique blog
  const countBlogOccurrences = (data) => {
    const blogCounts = {};

    // Count occurrences of each blog
    data.forEach((item) => {
      const { blog_id, reason } = item;
      const blogId = blog_id.blog_id.toString(); // Convert to string for consistency
      if (!blogCounts[blogId]) {
        blogCounts[blogId] = {
          total: 0,
          reasons: {
            Spam: 0,
            Hateful: 0,
            Irrelevancy: 0,
            'Aise hi': 0,
          },
        };
      }
      blogCounts[blogId].total++;
      if (blogCounts[blogId].reasons[reason] === undefined) {
        blogCounts[blogId].reasons[reason] = 1;
      } else {
        blogCounts[blogId].reasons[reason]++;
      }
    });
  
    return blogCounts;
  };

  useEffect(() => {
    const counts = countBlogOccurrences(flaggedBlogs);
    setUniqueBlogCounts(counts);
  }, [flaggedBlogs])

const handleDelete = (blogId) => {
  Alert.alert(
    'Are You Sure?',
    'This action cannot be undone.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          console.log('Deleting blog with ID:', blogId);
          // Implement delete logic here
        },
      },
    ],
    { cancelable: false }
  );
};

const [expandedBlogIds, setExpandedBlogIds] = useState([]);

const toggleExpanded = (blogId) => {
  setExpandedBlogIds((prevExpandedIds) =>
    prevExpandedIds.includes(blogId)
      ? prevExpandedIds.filter((id) => id !== blogId)
      : [...prevExpandedIds, blogId]
  );
};

const renderDescription = (blogId, description) => {
  const isExpanded = expandedBlogIds.includes(blogId);

  if (description.length > 100 && !isExpanded) {
    const truncatedDescription = `${description.substring(0, 100)}...`;
    return (
      <>
        <Text>{truncatedDescription}</Text>
        <TouchableOpacity onPress={() => toggleExpanded(blogId)}>
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </>
    );
  } else {
    return (
      <>
        <Text>{description}</Text>
        <TouchableOpacity onPress={() => toggleExpanded(blogId)}>
          <Text style={styles.viewMoreText}>View Less</Text>
        </TouchableOpacity>
      </>
    );
  }
};

const [modalVisible, setModalVisible] = useState(false);
const [selectedReason, setSelectedReason] = useState('');
const [selectedUsers, setSelectedUsers] = useState([]);
const [currentUserId, setCurrentUserId] = useState("");
const [reportReason, setReportReason] = useState("");
const [reportIndex, setReportIndex] = useState("");

const handleMarkOther = (blogId, reason) => {
  // Collect information about users who reported this reason for the blog
  const users = flaggedBlogs
    .filter(item => item.blog_id.blog_id.toString() === blogId && item.reason === reason)
    .map(item => ({
      name: `${item.user_id.first_name} ${item.user_id.last_name}`,
      date: item.post_date ? new Date(item.post_date).toLocaleDateString() : 'Not flagged'
    }));

  setSelectedUsers(users);
  setSelectedReason(reason);
  setModalVisible(true);
};

return (
  <LinearGradient colors={["rgba(255,255,255,0.2)", "rgba(110,113,254,0.6)", "rgba(4,0,207,0.4)"]} style={styles.gradient}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Blog Review</Text>
          <View style={styles.line} />
          {Object.entries(uniqueBlogCounts).map(([blogId, count]) => {
              const blog = flaggedBlogs.find(item => item.blog_id.blog_id.toString() === blogId);
              if (!blog) return null; // Skip rendering if blog not found
              return (
                <View key={blogId} style={styles.blogContainer}>
                  <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDelete(blog.id)}>
                    <AntDesign name="delete" size={17} color="red" />
                  </TouchableOpacity>
                  <Text style={styles.blogTitle}>{blog.blog_id.title}</Text>
                  <Text style={styles.authorname}>{blog.blog_id.user_id.first_name} {blog.blog_id.user_id.last_name}:-</Text>
                  {renderDescription(blog.id, blog.blog_id.description)}
                  {count.total > 0 && (
                    <View style={styles.buttonContainer}>
                      {Object.entries(count.reasons).map(([reason, reasonCount]) => (
                        reasonCount > 0 && (
                          <TouchableOpacity key={reason} onPress={() => handleMarkOther(blogId, reason)}>
                            <Text style={styles.buttonText}>{reason} {reasonCount}</Text>
                          </TouchableOpacity>
                        )
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
        </View>
      </ScrollView>
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
              <View>
                <Text style={styles.modalText}>{selectedReason}</Text>
                <ScrollView>
                  <View style = {styles.name}>
                  {selectedUsers.map((user, index) => (
                    <Text style = {styles.name_date} key={index}>{`${user.name} - ${user.date}`}</Text>
                  ))}
                  </View>
                </ScrollView>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
    </LinearGradient>
);
};

const styles = StyleSheet.create({
gradient: {
  flex: 1,
},
container: {
  flex: 1,
  padding: 20,
},
heading: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
},
name: {
  justifyContent: 'center'
},
line: {
  width: '100%',
  height: 2,
  backgroundColor: '#000000',
  marginTop: 5,
  marginBottom: 25,
},
authorname: {
  fontWeight: 'bold',
  color: 'green',
  marginBottom: 8,
  fontSize: 15
},
deleteIcon: {
  position: 'absolute',
  top: 10,
  right: 7,
  zIndex: 1,
},
blogContainer: {
  marginBottom: 30,
  borderWidth: 0.2,
  paddingTop: 10,
  paddingLeft: 10,
  paddingRight: 11,
  paddingBottom: 10,
  borderRadius: 10,
},
blogTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5,
},
buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  viewMoreText: {
    color: "green",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 11,
    color: "black",
    padding: 2,
    padding: 8,
    padingLeft:10,
    paddingRight: 10,
    borderRadius: 15,
    marginRight: 5,
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  name_date: {
    alignItems: 'center',
    fontSize: 18,
    marginLeft: 80,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
    marginBottom: 30,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    marginLeft: 140,
    marginRight: 140,
    marginTop: 25,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ResponderPage;