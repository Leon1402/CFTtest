import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export const MyInput = ({placeholder, value, change}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={change}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#EEE',
    padding: 10,
    marginBottom: 10,
  },
});
