// ReviewScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const ReviewScreen = () => {
  const navigation = useNavigation();

  const navigateToResponderReview = () => {
    navigation.navigate('ResponderReview');
  };

  const gradientColors = [
    "rgba(255,255,255,0.2)",
    "rgba(110,113,254,0.6)",
    "rgba(4,0,207,0.4)",
  ];

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
    <View style={styles.container}>
      <Text style={styles.heading}>Responder Review</Text>
      <View style={styles.line} />
      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("responderReview");
        }}
        >
          <Text style={styles.buttonText}>Review Blog</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
        >
          <Text style={styles.buttonText}>Review QnA</Text>
        </TouchableOpacity>
      </View>
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
        padding: 20
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#000000',
        marginTop: 5,
        marginBottom: 100,
    },
    button: {
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})
export default ReviewScreen;