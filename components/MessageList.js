import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({messages, currentUserId, currentUsername}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop: 10}}>
    {
      messages.map((message, index) => {
        return (
          <MessageItem message={message} key={index} currentUserId={currentUserId} currentUsername={currentUsername}/>
        )
      })
    }
    </ScrollView>
  )
}