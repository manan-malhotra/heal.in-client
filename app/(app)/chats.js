import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState('');
  useEffect(() => {
    getUsers();
    getUserId();
    getUserName();
  }, []);
  const getUsers = async () => {
      const response = await axios.get(
        process.env.API_HOST + "/doctors/getAll"
      );
      setUsers(response.data);
  };
  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      setCurrentUserId(value);
    } catch(e) {
      console.log(e);
    }
  }
  const getUserName = async () => {
    try {
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const value = firstName + "_" + lastName
      setCurrentUsername(value);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <View className="flex-1 bg-white">
      {users.length > 0 ? (
        <ChatList users={users} currentUserId={currentUserId} currentUsername={currentUsername} sentFrom="Users"/>
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" color="#3340B0" />
        </View>
      )}
    </View>
  );
};

export default Chats;
