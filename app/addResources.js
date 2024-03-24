import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AddResources = () => {
  const [resourceType, setResourceType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];

  const handleAddResource = () => {
    // Logic to add resource to the database or perform other actions
    console.log('Resource Type:', resourceType);
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Thumbnail:', thumbnail);
  };

  return (
    <LinearGradient colors={gradientColors}  style={styles.gradient}>
    <View style={styles.container}>
      <Text style={styles.heading}>Add Resources</Text>
      <RNPickerSelect
        onValueChange={(value) => setResourceType(value)}
        items={[
          { label: 'Blog', value: 'blog' },
          { label: 'Video', value: 'video' },
        ]}
        placeholder={{ label: 'Select Resource Type', value: null }}
        value={resourceType}
        style={{
          inputIOS: styles.dropdownButton,
          inputAndroid: styles.dropdownButton,
          placeholder: styles.dropdownPlaceholder,
          iconContainer: styles.dropdownIcon,
          viewContainer: styles.dropdownContainer,
          inputAndroidContainer: styles.dropdownContainer,
          inputIOSContainer: styles.dropdownContainer,
          chevronContainer: styles.dropdownChevron,
        }}
      />
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '100%',
      },
    container: {
      justifyContent:'center',
      flex: 1,
      padding: widthPercentageToDP(5),
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
      width: widthPercentageToDP(35),
      padding: widthPercentageToDP(3),
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'rgba(0,0,0,0.6)',
      fontSize: 16,
      fontWeight: 'bold',
    },
    dropdownButton: {
      height: 40,
      marginBottom: 10,
      borderRadius: 5,
      color: '#888',
      fontSize: 14, // Reduce font size
    },
    dropdownPlaceholder: {
      color: '#888',
    },
    dropdownIcon: {
      top: 15, // Adjust icon position
    },
    dropdownContainer: {
      borderWidth: 0.3,
      borderRadius: 5,
      marginBottom: heightPercentageToDP(2),
    },
    dropdownChevron: {
      display: 'flex', // Hide the dropdown chevron
    },
});

export default AddResources;
