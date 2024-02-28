import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import blogsData from '../../data/blog_content.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';


const BlogPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleViewMore = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleReportClick = () => {
    // Handle report click action here
    console.log('Report clicked');
  };

  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];

  return (
    <ScrollView>
      {/* Body */}
      <LinearGradient colors={gradientColors}  style={styles.gradient}>
      <View style={styles.body}>
        <Text style={styles.heading}>Our Blogs</Text>
        
        {/* Blog List */}
        <View style={styles.blogList}>
          {/* Map through the blogsData array and render each blog */}
          {blogsData.map((blog, index) => (
            <View style={styles.blog} key={index}>
              <Text style={styles.title}>{blog.title}</Text>
              <Text style={styles.author}>- {blog.author}</Text>
              <Text>
                {/* Display only the first few lines of content */}
                {expandedIndex === index ? blog.content : blog.content.length > 100 ? blog.content.substring(0, 100) + "......" : blog.content}
                {/* Render "View More" button only if content is longer than 100 characters */}
                {blog.content.length > 100 && (
                  <Text style={styles.viewMoreButton} onPress={() => handleViewMore(index)}>
                    {expandedIndex === index ? 'View Less' : ' View More'}
                  </Text>
                )}
              </Text>
              <Text style={styles.date}>{blog.date}</Text>
              <TouchableOpacity style={styles.reportButton} onPress={handleReportClick}>
                <Icon name="flag" size={15} color="#ccc" /> 
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
  }, 
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blogList: {
    marginTop: 10,
  },
  blog: {
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,255,0.07)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#005B55',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    fontWeight: 'medium',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#005B55',
    marginTop: 10,
  },
  viewMoreButton: {
    color: '#005B55',
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 10,
    right: 10,
  },
  viewMore: {
    color: 'green',
  },
  reportButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255,0,0,0.7)',
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 8,
    elevation: 5,
  },
  report: {
    color: '#ff3131',
    fontSize: 5,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default BlogPage;