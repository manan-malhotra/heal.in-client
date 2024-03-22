import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authcontext';

export default function doctorHome() {
    const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (
    <View>
        <Text>doctorHome</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText} >Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    logoutButton: {
      backgroundColor: '#1877F2',
      paddingVertical: '3%',
      borderRadius: 20,
      alignSelf: 'center',
      width: '30%',
    },
    buttonText: {
      alignSelf: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white'
    }
  });
  