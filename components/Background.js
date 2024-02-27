import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';

export default function Background({children}) {
  return (
      <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.64)']} style={styles.gradient}>
        <KeyboardAvoidingView style={styles.parentView} behavior='height'>{children}</KeyboardAvoidingView>
      </LinearGradient>
  )
}
const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        flex: 1,
      },
    parentView: {
        flex:1,
        padding: 15,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
})
