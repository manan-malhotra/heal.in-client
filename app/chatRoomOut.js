import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { db } from "../firebaseConfig";
import {
  router,
  Stack,
  Tabs,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../constants/Colors";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import MessageList from "../components/MessageList";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
const getRoomId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort();
  const roomId = sortedIds.join("-");
  return roomId;
};
const ChatRoom = () => {
  const data = useLocalSearchParams();
  console.log("DATA: ", data);
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(data.userId, data.other_userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });
    return unsub;
  }, []);
  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(data.userId, data.other_userId);
    const q = query(collection(db, "rooms"), where("roomId", "==", roomId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
    } else {
      const other_username = data.other_first_name + "_" + data.other_last_name;
      const username = data.firstName + "_" + data.lastName;
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        userId1: data.other_userId,
        userId2: data.UserId,
        username1: other_username,
        username2: username,
        createdAt: Timestamp.fromDate(new Date()),
        messagesExist: false,
      });
    }
  };

  const handleBackPress = () => {
    const user = {
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact: data.contact,
      age: data.age,
      gender: data.gender,
    };
    router.push({ pathname: "/doctor/chat", params: user });
  };

  const handleSendMessage = async () => {
    console.log("Inside this");
    let message = textRef.current.trim();
    console.log(message);
    if (!message) return;
    try {
      let roomId = getRoomId(data.userId, data.other_userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      await setDoc(
        doc(db, "rooms", roomId),
        { messagesExist: true },
        {
          merge: true,
        }
      );
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const username = data.firstName + "_" + data.lastName;
      const newDoc = await addDoc(messagesRef, {
        userId: data.userId,
        text: message,
        senderName: username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log("new message id: ", newDoc.id);
    } catch (e) {
      Alert.alert("Message", e.message);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          height: hp(90),
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingTop: "20%",
            paddingBottom: "2%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.leftContainer}>
            <TouchableOpacity
              onPress={() => {
                handleBackPress();
              }}
            >
              <Entypo
                name="chevron-left"
                size={hp("4%")}
                color={theme.colors.text}
              />
            </TouchableOpacity>

            <View className="flex-row items-center gap-5">
              <Text style={{ fontSize: hp(2.2), fontWeight: "600" }}>
                {data.other_first_name + " " + data.other_last_name}
              </Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Feather name="phone" size={hp(2.5)} color={"#000000"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Feather name="video" size={hp(2.6)} color={"#000000"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.verticalLine}></View>
        <ScrollView
          style={{
            paddingLeft: wp(2),
            paddingRight: wp(2),
          }}
        >
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0)" }}>
            <MessageList
              messages={messages}
              currentUserId={data.userId}
              currentUsername={data.firstName + "_" + data.lastName}
            />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingTop: hp(0),
          justifyContent: "justify-between",
          alignItems: "center",
          marginHorizontal: wp(4),
          height: hp(5),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "justify-between",
            backgroundColor: "#f1f1f1",
            opacity: 0.8,
            borderWidth: 1,
            padding: 8,
            borderColor: "black",
            borderRadius: 15,
            paddingLeft: wp(3),
          }}
        >
          <TextInput
            ref={inputRef}
            onChangeText={(value) => (textRef.current = value)}
            placeholder="Type message..."
            style={{ flex: 1, marginRight: 2, fontSize: hp(1.5) }}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            style={{
              backgroundColor: "#f1f1f1",
              opacity: 0.8,
              padding: 0,
              marginRight: 1,
              borderRadius: 999,
            }}
          >
            <Feather
              name="send"
              size={hp(2.7)}
              paddingTop="0.7%"
              paddingBottom="7.2%"
              paddingRight="3%"
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    paddingLeft: wp(4),
    gap: wp(5),
  },
  rightContainer: {
    flexDirection: "row",
    gap: wp(10),
    paddingRight: wp(9),
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },

  patientIcon: {
    width: "20%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
  },
  verticalLine: {
    height: hp(0.1),
    width: wp(89),
    alignSelf: "center",
    opacity: 1,
    backgroundColor: "black",
    marginVertical: 5,
  },
  bottomBar: {
    height: hp(10),
    backgroundColor: "red",
  },
});
