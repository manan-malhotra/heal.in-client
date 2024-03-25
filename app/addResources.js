import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AddResources = () => {
  const [resourceType, setResourceType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const handleAddResource = () => {
    // Logic to add resource to the database or perform other actions
    console.log('Resource Type:', resourceType);
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Thumbnail:', thumbnail);
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
          />
          <TextInput
            style={styles.input}
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChangeText={setThumbnail}
          />
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddResource}>
        <Text style={styles.buttonText}>Add Resource</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: heightPercentageToDP(5),
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
    padding: heightPercentageToDP(3),
    marginTop: heightPercentageToDP(5)
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
