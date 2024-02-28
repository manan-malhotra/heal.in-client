import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import entriesData from '../entries.json'
import {LinearGradient} from 'expo-linear-gradient';

const Journal = () => {
  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleViewMore = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNewEntry = () => {
    // Handle creating a new entry
    console.log('New Entry clicked');
  };

  const [showOptionsIndex, setShowOptionsIndex] = useState(null);

  const handleOptions = (index) => {
    setShowOptionsIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  function getFormattedDate() {
    const dateObj = new Date();
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = monthNames[monthIndex];
    return `${day} ${monthName} ${year}`;
  }
  

  return (
    <>
    <LinearGradient colors={gradientColors}  style={styles.gradient}>
    <ScrollView>
      {/* Body */}
      <View style={styles.body}>
        {/* Header */}
        <View style={styles.toppart}>
          <View style = {styles.toppartleft}>
            <Text style={styles.heading}>Write your mind down.{"\n"}Clear your thoughts. {"\n"}The Safest place for your thoughts.</Text>
          </View>
          <View style = {styles.toppartright}>
            <Text style={styles.author}>{getFormattedDate()}</Text>
          </View>
        </View>
        <View style={styles.line}></View>

        <View style={styles.header}>
          <Text style={styles.entryHeading}>Your Entires.</Text>
          <TouchableOpacity style={styles.newButton} onPress={handleNewEntry}>
            <Text style={styles.newButtonText}>+ NEW</Text>
          </TouchableOpacity>
        </View>
        
        {/* General Notes List */}
        <View>
          {entriesData.map((entries, index) => (
            <View style={styles.blog} key={index}>
              <TouchableWithoutFeedback onPress={() => handleOptions(index)}>
                <View style={styles.optionsContainer}>
                  <Icon name="ellipsis-v" size={15} color="black" />
                </View>
              </TouchableWithoutFeedback>
              {/* Render edit and delete options only if the current index matches the showOptionsIndex */}
              {showOptionsIndex === index && (
                <View style={styles.editDeleteOptions}>
                   <Text>Edit{"\n"}Delete</Text>
                </View>
              )}
              <Text style={styles.title}>{entries.title}</Text>
              <Text style={styles.author}>{entries.date}</Text>
              <Text style={styles.content}>
                {/* Display only the first few lines of content */}
                {expandedIndex === index ? entries.content : entries.content.length > 100 ? entries.content.substring(0, 100) + "......" : entries.content}
                {/* Render "View More" button only if content is longer than 100 characters */}
                {entries.content.length > 100 && (
                  <Text style={styles.viewMoreButton} onPress={() => handleViewMore(index)}>
                    {expandedIndex === index ? 'View Less' : ' View More'}
                  </Text>
                )}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
  }, 
  toppart: {
    flexDirection: 'row',
  },
  toppartleft: {
    justifyContent: 'flex-start',
    width: '80%'
  },
  toppartright: {
    justifyContent: 'top',
    alignItems: 'center',
    width: '25%',
    marginRight: 4,
  },
  entryHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20, 
  },
  heading: {
    fontSize: 15,
    fontWeight: 'medium',
    marginBottom: 10,
  },
  optionsContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 1
  },
  editDeleteOptions: {
    backgroundColor: 'white', // Ensure options have a background
    borderRadius: 5,
    padding: 5,
    position: 'absolute',
    top: 30, // Adjust as needed to position options correctly
    right: 15,
    zIndex: 2, // Ensure options appear above other content
  },
  newButton: {
    marginBottom: 10,
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 5,
  },
  newButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 5,
    opacity: 0.2,
  },
  blogList: {
    marginTop: 10,
  },
  blog: {
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,255,0.04)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    
    position: 'relative'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    flex:1
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
  },
  viewMoreButton: {
    color: '#005B55',
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 10,
    right: 10,
  },
});

export default Journal;