import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Clipboard,
  Linking,
  View,
} from "react-native";
import React, { useEffect, useRef, useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../firebaseConfig";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  SystemMessage,
  Send,
} from "react-native-gifted-chat";
import { db } from "../firebaseConfig";
import { router, useLocalSearchParams } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../constants/Colors";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { Alert } from "react-native";
const getRoomId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort();
  const roomId = sortedIds.join("-");
  return roomId;
};
function createRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
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
  const insets = useSafeAreaInsets();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  let firebaseImageURL = null;
  const [imageURL, setImageURL] = useState(null);
  const copyCodeToClipboard = async (videoId) => {
    Clipboard.setString(videoId);
  };

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(data.userId, data.other_userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([
        ...allMessages.map((message) => {
          return {
            _id: message.id,
            text: Decrypt(message.text),
            createdAt: message.createdAt.toDate(),
            user: {
              _id: message.userId === data.userId ? 1 : 0,
              name: message.senderName,
            },
            image: message.image ? message.image : null,
          };
        }),
      ]);
    });
    return unsub;
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      firebaseImageURL = await uploadImage(result.assets[0]);
      setImageURL(firebaseImageURL);
    }
  };

  const onSend = useCallback((messages = [], url) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    handleSendMessage(messages[0], url);
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
        image: image,
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

  const handleSendMessage = async (message, url) => {
    try {
      let roomId = getRoomId(data.userId, data.other_userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      await setDoc(
        doc(db, "rooms", roomId),
        { messagesExist: true },
        {
          merge: true,
        },
      );
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const username = data.firstName + "_" + data.lastName;
      const newDoc = await addDoc(messagesRef, {
        id: message._id,
        userId: data.userId,
        text: Encrypt(message.text),
        senderName: username,
        createdAt: message.createdAt,
        image: url ? url : null,
      });
      console.log(newDoc);
      setImage(null);
    } catch (e) {
      console.log("Message", e.message);
    }
  };
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          marginLeft: hp(1),
          marginRight: hp(1),
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "black",
          borderWidth: 1,
          borderRadius: 999,
        }}
      ></InputToolbar>
    );
  };

  const renderChatFooter = useCallback(() => {
    if (image) {
      return (
        <View style={styles.chatFooter}>
          <Image source={{ uri: image }} style={{ height: 75, width: 75 }} />
          <TouchableOpacity
            onPress={() => setImage("")}
            style={styles.buttonFooterChatImg}
          >
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // if (filePath) {
    //   return (
    //     <View style={styles.chatFooter}>
    //       <InChatFileTransfer filePath={filePath} />
    //       <TouchableOpacity
    //         onPress={() => setFilePath("")}
    //         style={styles.buttonFooterChat}
    //       >
    //         <Text style={styles.textFooterChat}>X</Text>
    //       </TouchableOpacity>
    //     </View>
    //   );
    // }
    return null;
  }, [image]);

  const handleVideoCall = () => {
    // Linking.openURL(`https://shepherd-casual-subtly.ngrok-free.app/`);
    Linking.openURL(`http://172.16.129.74:3000/`);
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
            <TouchableOpacity
              onPress={() => {
                try {
                  Alert;
                  axios.post(process.env.TWILIO_API_HOST + "initiate-call", {
                    to: "+917756994033",
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
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
                    { cancelable: false },
                  );
                } else if (data.role == "DOCTOR") {
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
                          const message = {
                            _id: Math.random(),
                            text: sendMessage,
                            createdAt: new Date(),
                          };
                          handleSendMessage(message, null);
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
                            ],
                          );
                        },
                      },
                      {
                        text: "Cancel",
                        onPress: () => {},
                        style: "cancel",
                      },
                    ],
                    { cancelable: false },
                  );
                }
              }}
            >
              <Feather name="video" size={hp(2.6)} color={"#000000"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.verticalLine}></View>
        <ImageBackground
          source={require("../assets/wallpaper.png")}
          style={{
            flex: 1,
            marginBottom: insets.bottom + 10,
            backgroundColor: "white",
          }}
        >
          <GiftedChat
            messages={messages}
            alwaysShowSend
            onSend={async (messages) => {
              onSend(messages, imageURL);
            }}
            user={{
              _id: 1,
            }}
            renderSystemMessage={(props) => {
              <SystemMessage {...props} />;
            }}
            bottomOffset={insets.bottom}
            onInputTextChanged={setText}
            renderAvatar={null}
            maxComposerHeight={100}
            renderChatFooter={renderChatFooter}
            renderBubble={(props) => {
              return (
                <View style={{ marginBottom: hp(1) }}>
                  <Bubble
                    {...props}
                    textStyle={{
                      left: {
                        color: "black",
                        fontSize: hp(1.7),
                      },
                      right: {
                        color: "white",
                        fontSize: hp(1.7),
                      },
                    }}
                    wrapperStyle={{
                      left: {
                        backgroundColor: theme.colors.background,
                        borderWidth: 1,
                        borderColor: "rgb(229, 229, 229)",
                      },
                      right: {
                        backgroundColor: theme.colors.button,
                        borderWidth: 1,
                        borderColor: "rgb(0, 0, 0)",
                      },
                    }}
                  />
                </View>
              );
            }}
            renderSend={(props) => {
              return (
                <View
                  style={{
                    height: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    paddingHorizontal: 14,
                  }}
                >
                  <TouchableOpacity onPress={pickImage}>
                    <Ionicons
                      name="camera-outline"
                      color={theme.colors.button}
                      size={28}
                    />
                  </TouchableOpacity>
                  <Send
                    {...props}
                    containerStyle={{
                      justifyContent: "center",
                    }}
                  >
                    <Feather
                      name="send"
                      color={theme.colors.button}
                      size={25}
                    />
                  </Send>
                </View>
              );
            }}
            renderInputToolbar={renderInputToolbar}
          />
        </ImageBackground>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  composer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "lightgray",
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
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
  chatFooter: {
    shadowColor: "#1F2687",
    shadowOpacity: 0.37,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    elevation: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    flexDirection: "row",
    padding: hp(1.5),
    marginLeft: wp(3.5),
    marginRight: wp(4),
    backgroundColor: "white",
  },
  buttonFooterChat: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderColor: "black",
    right: 3,
    top: -2,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  buttonFooterChatImg: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderColor: "black",
    left: 66,
    top: -4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  textFooterChat: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
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
    paddingVertical: Platform.OS === "ios" ? hp(1) : 0,
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
