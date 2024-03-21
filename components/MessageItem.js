import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function MessageItem({message, currentUserId, currentUsername}) {
    if(currentUserId == message?.userId) {
        return (
            <View style={styles_me.container}>
            <View style={styles_me.outerView}>
              <View style={styles_me.innerView}>
                <Text style={styles_me.text}>{message?.text}</Text>
              </View>
            </View>
          </View>
        )
    } else {
        return (
            <View style={styles_other.container}>
                <View style={styles_other.outerView}>
                    <View style={styles_other.innerView}>
                    <Text style={styles_other.text}>{message?.text}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles_other = StyleSheet.create({
    container: {
        width: wp(80),
        marginLeft: 12, 
        marginBottom: 12,
    },
    outerView: {
    },
    innerView: {
        alignSelf: 'flex-start',
        paddingVertical: 12, 
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: 'rgb(224, 231, 255)',
        borderWidth: 1,
        borderColor: 'rgb(199, 210, 254)',
    },
    text: {
        fontSize: hp(1.9),
    },
});

const styles_me = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 12,
      marginRight: 12,
    },
    outerView: {
        width: wp(80)
    },
    innerView: {
      alignSelf: 'flex-end',
      padding: 12,
      borderRadius: 16,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'rgb(229, 229, 229)',
    },
    text: {
      fontSize: hp(1.9),
    },
});