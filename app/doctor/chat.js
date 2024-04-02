import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { theme } from "../../constants/Colors.js";
import SearchBar from "../../components/searchBar";
import { Asset } from "expo-asset";
import ChatCard from "../../components/ChatCard";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  and,
  collection,
  onSnapshot,
  or,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { ActivityIndicator } from "react-native-paper";

const Chat = () => {
  const users = useLocalSearchParams();
  const [rooms, setRooms] = useState({});
  const [searchText, setSearchText] = useState("");
  const [renderData, setRenderData] = useState([]);
  const handleSearch = (text) => {
    setSearchText(text);
    const filteredData = rooms.filter((patient) =>
      patient.user_id.first_name.toLowerCase().includes(text.toLowerCase())
    );
    setRenderData(filteredData);
  };
  const openChatRoom = (user) => {
    const data = {
      age: users.age,
      contact: users.contact,
      email: users.email,
      firstName: users.firstName,
      gender: users.gender,
      lastName: users.lastName,
      role: users.role,
      userId: users.userId,
      other_first_name: user.user_id.first_name,
      other_last_name: user.user_id.last_name,
      other_userId: user.user_id.user_id,
    };
    router.push({
      pathname: "/chatRoomOut",
      params: data,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const userId = users.userId;
    const q = query(
      collection(db, "rooms"),
      and(
        or(where("userId1", "==", userId), where("userId2", "==", userId)),
        where("messagesExist", "==", true)
      )
    );
    let unsub = onSnapshot(q, (querySnapshot) => {
      let allRooms = querySnapshot.docs.map((doc) => {
        const name = doc.get("username2").split("_");
        const temp = {
          user_id: {
            first_name: name[0],
            last_name: name[1],
            user_id: doc.get("userId2"),
            contact: "1234567890",
          },
        };
        return temp;
      });
      setRooms([...allRooms]);
      setRenderData([...allRooms]);
    });
    return unsub;
  };

  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={{ paddingBottom: 10 }}>
          <SearchBar handleSearch={handleSearch} searchText={searchText} />
        </View>
        {renderData.length === 0 ? (
          <View
            style={{
              flex: 1,
              height: hp(70),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={theme.colors.button} />
          </View>
        ) : (
          renderData.map((patient) => (
            <View key={patient.user_id.user_id} style={{ paddingTop: 7 }}>
              <Pressable onPress={() => openChatRoom(patient)}>
                <ChatCard
                  id={patient.user_id.user_id}
                  name={
                    patient.user_id.first_name + " " + patient.user_id.last_name
                  }
                  gender={patient.user_id.gender}
                  icon="person"
                  iconBackground="blue"
                />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: hp(10),
  },
});
