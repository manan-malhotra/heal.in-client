import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import blogsData from '../blog_content.json';
import Icon from 'react-native-vector-icons/FontAwesome';

const BlogPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleViewMore = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleReportClick = () => {
    // Handle report click action here
    console.log('Report clicked');
  };

  return (
    <ScrollView>
      {/* Body */}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    backgroundColor: '#766ade',
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
    backgroundColor: '#bab3f5',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    backgroundColor: '#ff3131',
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