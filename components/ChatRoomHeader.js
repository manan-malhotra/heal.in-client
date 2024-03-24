import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function ChatRoomHeader({user, router, sentFrom}) {
    if(sentFrom == "Doctors") {
        return (
            <Stack.Screen 
                options={{
                    headerTitle: user.first_name + " " + user.last_name ,
                    headerStyle: {
                    backgroundColor: "#3340B0",
                    },
                    headerTintColor: "white",
                    navigationBarColor: "#3340B0"
                }}
            />
        )
    }
    else {
        return (
            <Stack.Screen 
                options={{
                    headerTitle: "Dr. " + user.first_name + " " + user.last_name ,
                    headerStyle: {
                    backgroundColor: "#3340B0",
                    },
                    headerTintColor: "white",
                    navigationBarColor: "#3340B0"
                }}
            />
        )
    }
}