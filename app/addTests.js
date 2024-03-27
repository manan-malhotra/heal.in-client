import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AddTests = () => {
  const [testName, setTestName] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    // Logic to add question to the database or perform other actions
    console.log('Test Name:', testName);
    console.log('Question:', question);
    console.log('Options:', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Question</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            testName === 'ADHD' && styles.selectedOption,
          ]}
          onPress={() => setTestName('ADHD')}
        >
          <Text style={styles.optionText}>ADHD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            testName === 'Depression' && styles.selectedOption,
          ]}
          onPress={() => setTestName('Depression')}
        >
          <Text style={styles.optionText}>Depression</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            testName === 'Anxiety' && styles.selectedOption,
          ]}
          onPress={() => setTestName('Anxiety')}
        >
          <Text style={styles.optionText}>Anxiety</Text>
        </TouchableOpacity>
      </View>
      {testName && (
        <>
          <TextInput
            style={[styles.input, { height: 50 }]}
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
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: heightPercentageToDP(55.3),
    borderRadius: heightPercentageToDP(5),
    backgroundColor: 'white',
    opacity: 0.8,
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
    padding: heightPercentageToDP(3)
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 30,
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'rgba(40,20,255,0.22)',
    alignSelf: 'center',
    width: widthPercentageToDP(30),
    borderRadius: 5,
    alignItems: 'center',
    padding: widthPercentageToDP(2)
  },
  buttonText: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionText: {
    fontSize: 11,
    padding: 10
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP(2)
  },
  option: {
    width: widthPercentageToDP(22),
    height: heightPercentageToDP(4.5),
    backgroundColor: 'rgba(0,0,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  selectedOption: {
    backgroundColor: 'rgba(0,0,255,0.55)',
  },
});

export default AddTests;
