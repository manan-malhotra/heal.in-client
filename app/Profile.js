import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/authcontext";

const Profile = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (
    <LinearGradient
      colors={[
        "rgba(255,255,255,0.2)",
        "rgba(110,113,254,0.6)",
        "rgba(4,0,207,0.4)",
      ]}
      style={styles.container}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Profile Screen</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Profile;
