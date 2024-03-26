import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/authcontext'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { collection, query, where, or, and, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { ActivityIndicator } from 'react-native-paper'
import ChatList from '../../components/ChatList'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function doctorHome() {
  const item = useLocalSearchParams();
  const [rooms, setRooms] = useState({});
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  }
  const handleRoute = () => {
    router.replace({pathname: "/home", params: item})
  }
  useEffect(() => {
    const getData = async () => {
      const userId = item.userId;
      const q = query(collection(db, "rooms"), and(or(where("userId1", "==", userId), where("userId2", "==", userId)), where("messagesExist", "==", true)));
      let unsub=onSnapshot(q, (snapshot) => {
          let allRooms = snapshot.docs.map(doc => {
            const name = doc.get("username2").split("_")
            const temp = {
              user_id: {
                first_name: name[0],
                last_name: name[1],
                user_id: doc.get("userId2"),
                contact: '123456'
              }
            }
            return temp;
          });
          setRooms([...allRooms]);
        });
        return unsub;
    }
    getData();
    setDoctorBoolean();
}, []);

  const setDoctorBoolean = async () => {
    await AsyncStorage.setItem("doctorBoolean", "true");
  }

  return (
    <View className="flex-1 bg-white">
    
      <ChatList users={rooms} currentUserId={item.userId} currentUsername={item.firstName + "_" + item.lastName} sentFrom="Doctors"/>
      {rooms.length > 0 ? (
        <SafeAreaView>
        <View>
          <Text>{rooms[0].user_id.userId}</Text>
          <ChatList users={rooms} currentUserId={item.userId} currentUsername={item.firstName}/>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText} >Logout</Text>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
      ) : (
        <View>
        <SafeAreaView>
          <View className="items-center">
          <Text style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
            No messages available
          </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText} >Logout</Text>
          </TouchableOpacity>
          </SafeAreaView>
          </View>
      )}
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
  