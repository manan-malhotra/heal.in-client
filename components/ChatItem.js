import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UserAvatar from 'react-native-user-avatar'

export default function ChatItem({item, router, noBorder, currentUserId, currentUsername, sentFrom}) {
  const data={
    'first_name': item.user_id.first_name,
    'last_name': item.user_id.last_name,
    'userId': item.user_id.user_id,
    'contact': item.user_id.contact,
    'currentUserId': currentUserId,
    'currentUsername': currentUsername,
    'sentFrom': sentFrom
  }
  const openChatRoom = () => {
    router.push({pathname: '/chatRoom', params: data})
  }
  if(sentFrom === "Doctors") {
    return (
      <TouchableOpacity onPress={openChatRoom} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} className={`${noBorder? '': 'border-b border-b-neutral-200'}`}>
        <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden', marginRight: 10 }}>
          <UserAvatar size={60} name={item.user_id.first_name + " " + item.user_id.last_name}/>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: hp(1.8), fontWeight: 'bold', marginBottom: 5 }}>{item.user_id.first_name + " " + item.user_id.last_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  else {
    return (
      <TouchableOpacity onPress={openChatRoom} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} className={`${noBorder? '': 'border-b border-b-neutral-200'}`}>
        <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden', marginRight: 10 }}>
          {/* <Image source={require('../assets/images/ConsultDoctor/doctor1.png')} style={{ width: 60, height: 60, resizeMode: 'cover' }} /> */}
          <UserAvatar size={60} name={item.user_id.first_name + " " + item.user_id.last_name}/>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: hp(1.8), fontWeight: 'bold', marginBottom: 5 }}>{"Dr. " + item.user_id.first_name + " " + item.user_id.last_name}</Text>
            <Text style={{ fontSize: hp(1.6), marginBottom: 5 }} className="font-medium text-neutral-500">{"Exp: " + item.experience + " years"}</Text>
          </View>
          <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-500">{"Degree: " + item.degree + ", Spl.: " + item.specialization}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}