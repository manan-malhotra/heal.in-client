import React, { useState, useEffect } from 'react';
import { TextInput as Input } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { theme } from '../constants/Colors';

export default function MyTextInput({
  errorInput,
  placeholderText,
  isPassword,
  isEmail,
  isNum,
  value,
  onChangeText,
  ...props
}) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChangeText = (value) => {
    if (isNum) {
      const numericValue = value.replace(/[^0-9]/g, '');
      setText(numericValue);
    } else {
      setText(value);
    }
    if (onChangeText) {
      onChangeText(value);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Input
        style={styles.formInput}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        placeholder={placeholderText}
        secureTextEntry={isPassword}
        keyboardType={isEmail ? 'email-address' : isNum ? 'numeric' : 'default'}
        autoCapitalize={isEmail ? 'none' : 'sentences'}
        value={text}
        onChangeText={handleChangeText}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
  },
  formInput: {
    backgroundColor: '#F4F4F4',
    fontSize: 17,
    height: 40,
    width: '100%',
    paddingHorizontal: 12,
    color: 'grey',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
  },
});
