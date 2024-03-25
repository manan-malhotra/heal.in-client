import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const gradientColors = [
    "rgba(255,255,255,0.2)",
    "rgba(110,113,254,0.6)",
    "rgba(4,0,207,0.4)",
];

const ScoreCard = () => {
  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.heading}>Score Card</Text>
            <View style={styles.line} />
        </View>
        <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Your Result - Depression Test:</Text>
            <Text style={styles.result}>Severe Depression</Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>ABOUT YOUR SCORE: 19/24</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>EMAIL RESULT</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>YOUR ANSWERS</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>TAKE ANOTHER MENTAL HEALTH TEST</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.paragraph}>
            Based on your responses, you may have symptoms of severe depression. This result is not a diagnosis. A doctor or therapist can help you get a diagnosis and/or treatment
        </Text>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#000000',
    marginTop: 15,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: "white",
    paddingVertical: 25,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  resultTitle: {
    fontSize: 16,
    marginBottom: 5,
    opacity: 1,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 1,
  },
  buttonContainer: {
    marginTop: 25,
    marginBottom: 30,
  },
  button: {
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 13,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 16,
  },
});

export default ScoreCard;