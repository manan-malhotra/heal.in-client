import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const questions = [
  {
    "id": 1,
    "question": "1. Feeling down or depressed?",
    "options": ["Not at all", "Several Days", "More than half the days", "Nearly Every Day"]
  },
  {
    "id": 2,
    "question": "2. Little Interest or pleasure in doing things?",
    "options": ["Not at all", "Several Days", "More than half the days", "Nearly Every Day"]
  },
  {
    "id": 3,
    "question": "3. Trouble falling or staying asleep, or sleeping too much?",
    "options": ["Not at all", "Several Days", "More than half the days", "Nearly Every Day"]
  },
  {
    "id": 4,
    "question": "4. Poor appetite or overacting?",
    "options": ["Not at all", "Several Days", "More than half the days", "Nearly Every Day"]
  },
  {
    "id": 5,
    "question": "5. Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    "options": ["Not at all", "Several Days", "More than half the days", "Nearly Every Day"]
  },
  {
    "id": 6,
    "question": "6. Trouble concentrating on things, such as reading the newspaper or watching television?",
    "options": ["Not at all", "Several Days", "More than half the days", "Nearly Every Day"]
  }
];

const DepressionTest = () => {
  const gradientColors = [
    "rgba(255,255,255,0.2)",
    "rgba(110,113,254,0.6)",
    "rgba(4,0,207,0.4)",
  ];

  // State to track selected options
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(-1));

  // Function to handle option selection
  const handleOptionPress = (questionIndex, optionIndex) => {
    // Toggle the selection state
    const newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions[questionIndex] === optionIndex) {
      // If already selected, unselect
      newSelectedOptions[questionIndex] = -1;
    } else {
      // If not selected, select
      newSelectedOptions[questionIndex] = optionIndex;
    }
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.heading}>Depression Test</Text>
          <View style={styles.line}></View>
          <View style={styles.questionContainer}>
            <Text style={styles.test}>Test Question</Text>
            <Text style={styles.questionText}>Over the last 2 weeks, how often have you been bothered by any of the following problems?</Text>
          </View>
          {questions.map((question, questionIndex) => (
            <View key={questionIndex} style={styles.questionContainer}>
              <Text style={styles.questionHeading}>{question.question}</Text>
              <View style={styles.optionsContainer}>
                {question.options.map((option, optionIndex) => (
                  <TouchableOpacity 
                    key={optionIndex} 
                    style={[
                      styles.optionButton,
                      selectedOptions[questionIndex] === optionIndex && styles.selectedOption // Apply style if option is selected
                    ]}
                    onPress={() => handleOptionPress(questionIndex, optionIndex)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0,0,255,0.07)",
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 25,
  },
  questionContainer: {
    marginBottom: 20,
  },
  test: {
    fontSize: 20,
    marginBottom: 25,
    fontWeight: 'bold'
  },
  questionText: {
    fontSize: 17,
    marginBottom: 10,
  },
  questionHeading: {
    fontSize: 17,
    marginBottom: 20,
    fontWeight:500
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
    width: '48%', // Set the width to fit two buttons in a row
  },
  optionText: {
    textAlign: 'center',
    fontSize: 12,
  },
  selectedOption: {
    backgroundColor: 'darkorange', // Change color to dark yellow when selected
  },
  submitButton: {
    backgroundColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 35,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DepressionTest;