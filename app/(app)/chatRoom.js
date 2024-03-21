import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader'
import MessageList from '../../components/MessageList'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons'
import CustomKeyboardView from '../../components/CustomKeyboardView'
import { getRoomId } from '../utils/common'
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig'

export default function ChatRoom() {
    const item = useLocalSearchParams();
    const router=useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();
        let roomId = getRoomId(item.userId, item.currentUserId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        let unsub=onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setMessages([...allMessages]);
        });
        return unsub;
    }, []);
    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(item.userId, item.currentUserId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if(!message) return;
        try {
            let roomId = getRoomId(item.userId, item.currentUserId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, "messages");
            textRef.current="";
            if(inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messagesRef, {
                userId: item.currentUserId,
                text: message,
                senderName: item.currentUsername,
                createdAt: Timestamp.fromDate(new Date())
            })
            console.log('new message id: ', newDoc.id)
        } catch(e) {
            Alert.alert('Message', e.message);
        }
    }
    return (
        <CustomKeyboardView inChat={true}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ChatRoomHeader user={item} router={router}/>
                <View style={{ flex: 1}}>
                <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)' }}>
                        <MessageList messages={messages} currentUserId={item.currentUserId} currentUsername={item.currentUsername}/>
                    </View>
                    <View style={{ marginBottom: hp(1.7)}} className="pt-2">
                        <View style={{ flexDirection: 'row', justifyContent: 'justify-between', alignItems: 'center', marginHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'justify-between', backgroundColor: 'white', borderWidth: 1, padding: 8, borderColor: '#d3d3d3', borderRadius: 999, paddingLeft: 5}}>
                                <TextInput ref={inputRef} onChangeText={value => textRef.current = value} placeholder='Type message...' style={{ flex: 1, marginRight: 2, fontSize: hp(1.5) }} />
                                <TouchableOpacity onPress={handleSendMessage} style={{ backgroundColor: '#e5e5e5', padding: 2, marginRight: 1, borderRadius: 999 }}>
                                <Feather name="send" size={hp(2.7)} color="#737373" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}
