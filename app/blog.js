import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import blogsData from './blog_content.json';

const BlogPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleViewMore = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
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
                <Text style={styles.author}>Author: {blog.author}</Text>
                <Text style={styles.content}>
                  {/* Display only the first few lines of content */}
                  {expandedIndex === index ? blog.content : blog.content.substring(0, 100)}
                  {/* Render "View More" or "View Less" button based on expanded state */}
                  {blog.content.length > 100 && (
                    <TouchableOpacity onPress={() => handleViewMore(index)} style={styles.viewMoreButton}>
                      <Text style={styles.viewMore}>
                        {expandedIndex === index ? 'View Less' : 'View More'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Text>
                <Text style={styles.date}>Date: {blog.date}</Text>
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
    marginBottom: 5,
    color: 'green',
  },
  content: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  viewMoreButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  viewMore: {
    color: 'green',
  },
});

export default BlogPage;