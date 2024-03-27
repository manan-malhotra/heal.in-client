import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AddResources = () => {
  const [resourceType, setResourceType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [video, setVideo] = useState('')

  const handleAddResource = async () => {
    if(resourceType == 'blog') 
    {
      try {
        const response = await axios.post(
            process.env.API_HOST + "/admin/addBlogs",
            {
              "description": content,
              "title": title,
              "user_id": 28
            }
        );
        if (response.status === 200) {
          console.log("SUCCESS");
          setResourceType('');
          setTitle('');
          setContent('');
        }
      } catch (error) {
      
        console.log("Error saving post: " + error);
        console.log(error.data.message);
      }
    }
    else if(resourceType == 'video') {
      try {
        const response = await axios.post(
            process.env.API_HOST + "/admin/addSelfHelpVideos",
            {
              "title": title,
              "url": video
            }
        );
        if (response.status === 200) {
          console.log("SUCCESS");
          setResourceType('');
          setTitle('');
          setVideo('');
        }
      } catch (error) {
      
        console.log("Error saving post: " + error);
        console.log(error.data.message);
      }
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Resources</Text>
      <View style={styles.resourceTypeContainer}>
        <TouchableOpacity
          style={[
            styles.resourceTypeButton,
            resourceType === 'blog' && styles.selectedResourceType,
          ]}
          onPress={() => setResourceType('blog')}
        >
          <Text style={styles.resourceTypeButtonText}>Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.resourceTypeButton,
            resourceType === 'video' && styles.selectedResourceType,
          ]}
          onPress={() => setResourceType('video')}
        >
          <Text style={styles.resourceTypeButtonText}>Video</Text>
        </TouchableOpacity>
      </View>
      {resourceType === 'blog' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, { height: heightPercentageToDP(10) }]}
            placeholder="Content"
            multiline
            value={content}
            onChangeText={setContent}
          />
        </View>
      )}
      {resourceType === 'video' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          /><TextInput
            style={styles.input}
            placeholder="Video URL"
            value={video}
            onChangeText={setVideo}
          />
        </View>
      )}
      {resourceType && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddResource}>
          <Text style={styles.buttonText}>Add Resource</Text>
        </TouchableOpacity>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: heightPercentageToDP(5),
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
    padding: heightPercentageToDP(3),
    marginTop: heightPercentageToDP(0.1),
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: widthPercentageToDP(10),
    textAlign: 'center',
  },
  input: {
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: heightPercentageToDP(2),
    padding: widthPercentageToDP(5),
    paddingVertical: widthPercentageToDP(1)
  },
  addButton: {
    backgroundColor: 'rgba(40,20,255,0.22)',
    alignSelf: 'center',
    width: widthPercentageToDP(30),
    padding: widthPercentageToDP(2),
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resourceTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP(2),
  },
  resourceTypeButton: {
    flex: 1,
    height: heightPercentageToDP(5),
    backgroundColor: 'rgba(0,0,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: widthPercentageToDP(2),
    marginRight: widthPercentageToDP(2)
  },
  selectedResourceType: {
    backgroundColor: 'rgba(0,0,255,0.55)',
  },
  resourceTypeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddResources;
