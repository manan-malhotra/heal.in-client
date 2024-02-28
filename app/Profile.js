import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const Profile = () => {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)']}
      style={styles.container}>
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Profile Screen</Text>
            </View>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Profile;