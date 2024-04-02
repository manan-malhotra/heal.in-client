import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserAvatar from "react-native-user-avatar";

export default function ChatItem({
  item,
  router,
  noBorder,
  currentUserId,
  currentUsername,
  sentFrom,
}) {
  const data = {
    first_name: item.user_id.first_name,
    last_name: item.user_id.last_name,
    userId: item.user_id.user_id,
    contact: item.user_id.contact,
    currentUserId: currentUserId,
    currentUsername: currentUsername,
    sentFrom: sentFrom,
  };
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: data });
  };

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
      className={`${noBorder ? "" : "border-b border-b-neutral-200"}`}
    ></TouchableOpacity>
  );
}
