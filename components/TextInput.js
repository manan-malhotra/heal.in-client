import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../constants/Colors'

export default function MyTextInput({ errorInput, placeholderText, isPassword, ...props }) {
  return (
    <View style={styles.inputContainer}>
      <Input
        style={styles.formInput}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        placeholder={placeholderText}
        secureTextEntry={isPassword} 
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 10
  },
  formInput: {
    backgroundColor: "#F4F4F4",
    fontSize: 17,
    height: 40,
    width: '100%',
    paddingHorizontal: 12,
    color: 'grey', // Set text color
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
});
