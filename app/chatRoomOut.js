import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  View,
  Clipboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebaseConfig";
import { router, useLocalSearchParams } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../constants/Colors";
import { Entypo, Feather } from "@expo/vector-icons";
import MessageList from "../components/MessageList";
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
import { Decrypt, Encrypt } from "../common/aes";
const getRoomId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort();
  const roomId = sortedIds.join("-");
  return roomId;
};

function generateRoomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const ChatRoom = () => {
  const [codeSnippet, setCodeSnippet] = useState("");
  const data = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const copyCodeToClipboard = async (videoId) => {
    Clipboard.setString(videoId);
  };

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
      const username = data.other_first_name + "_" + data.other_last_name;
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        userId1: data.other_userId,
        userId2: data.userId,
        username1: username,
        username2: data.firstName + "_" + data.lastName,
        createdAt: Timestamp.fromDate(new Date()),
        messagesExist: false,
        userGender: data.gender,
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
    router.dismiss();
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
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
        text: Encrypt(message),
        senderName: username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (e) {
      console.log("Message", e.message);
    }
  };

  const handleVideoCall = () => {
    Linking.openURL(`https://shepherd-casual-subtly.ngrok-free.app/`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
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
            <TouchableOpacity
              onPress={() => {
                if (data.role == "USER") {
                  Alert.alert(
                    "Video Call",
                    "You will need room id to access the video call.",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          handleVideoCall();
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  Alert.alert(
                    "Room Id",
                    codeSnippet,
                    [
                      {
                        text: "Copy",
                        onPress: () => {
                          const videoId = generateRoomId(5);
                          copyCodeToClipboard(videoId);
                          const sendMessage = "Room id: " + videoId;
                          textRef.current = sendMessage;
                          handleSendMessage();
                          Alert.alert(
                            "Copied",
                            "The room id has been copied to the clipboard.",
                            [
                              {
                                text: "OK",
                                onPress: () => {
                                  handleVideoCall();
                                },
                              },
                            ]
                          );
                        },
                      },
                      {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel",
                      },
                    ],
                    { cancelable: false }
                  );
                }
              }}
            >
              <Feather name="video" size={hp(2.6)} color={"#000000"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.verticalLine}></View>
        <ScrollView style={styles.messageContainer}>
          <MessageList
            messages={messages}
            currentUserId={data.userId}
            currentUsername={data.firstName + "_" + data.lastName}
          />
        </ScrollView>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <View style={{}}>
          <View style={styles.inputContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type message..."
                style={styles.textInput}
                returnKeyType="send"
                onSubmitEditing={handleSendMessage}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                style={styles.sendButton}
              >
                <Feather name="send" size={hp(2.7)} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingTop: hp(6),
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp("2%"),
  },
  headerText: {
    fontSize: hp(2.2),
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
  },
  verticalLine: {
    height: 1,
    width: wp(90),
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "gray",
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: wp(3),
    marginBottom: wp(2),
  },
  inputContainer: {
    height: hp(5),
    width: wp(85),
    marginBottom: hp(2),
    marginLeft: "auto",
    marginRight: "auto",
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: wp(3),
  },
  textInput: {
    flex: 1,
    fontSize: hp(1.5),
    paddingVertical: Platform.OS === "ios" ? hp(1) : 0, // Add padding for iOS to prevent the cursor from being obscured by the keyboard
  },
  sendButton: {
    padding: wp(2.5),
    borderRadius: 999,
  },
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
  bottomBar: {
    height: hp(10),
    backgroundColor: "red",
  },
});
