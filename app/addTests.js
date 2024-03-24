import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const AddTests = () => {
  const [testName, setTestName] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];

  const handleAddQuestion = () => {
    // Logic to add question to the database or perform other actions
    console.log('Test Name:', testName);
    console.log('Question:', question);
    console.log('Options:', options);
  };

  return (
    <LinearGradient colors={gradientColors}  style={styles.gradient}>
    <View style={styles.container}>
      <Text style={styles.heading}>Add Question</Text>
      <RNPickerSelect
        onValueChange={(value) => {
            setTestName(value);
            console.log(testName);
            }}
        items={[
          { label: 'Test 1', value: 'test1' },
          { label: 'Test 2', value: 'test2' },
          { label: 'Test 3', value: 'test3' },
        ]}
        placeholder={{ label: 'Select Test Name', value: null }}
        value={testName}
        style={{
          inputIOS: styles.dropdownButton,
          inputAndroid: styles.dropdownButton,
          placeholder: styles.dropdownPlaceholder,
          iconContainer: styles.dropdownIcon,
          // Dropdown styles
          viewContainer: styles.dropdownContainer,
          inputAndroidContainer: styles.dropdownContainer,
          inputIOSContainer: styles.dropdownContainer,
          // Dropdown item styles
          chevronContainer: styles.dropdownChevron,
        }}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Question"
        multiline
        value={question}
        onChangeText={setQuestion}
      />
      {options.map((option, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChangeText={(value) => handleOptionChange(index, value)}
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
        <Text style={styles.buttonText}>Add Question</Text>
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
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderWidth: 0.3,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: 'rgba(40,20,255,0.22)',
        alignSelf: 'center',
        width: widthPercentageToDP(35),
        borderRadius: 5,
        alignItems: 'center',
        padding: widthPercentageToDP(3)
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
      color: 'gray',
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
      marginBottom: 10,
    },
    dropdownChevron: {
      display: 'flex', // Hide the dropdown chevron
    },
  });

export default AddTests;
