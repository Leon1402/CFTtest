import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const MyButton = ({action, text, active, disabled}) => {
  //Определяет внешний вид кнопки
  const activeClass = active
    ? {
        backgroundColor: '#333',
        color: '#FFF',
        opacity: disabled ? 0.5 : 1,
      }
    : {
        backgroundColor: '#BBB',
        opacity: disabled ? 0.5 : 1,
        color: '#000',
      };

  return (
    <TouchableOpacity
      style={[styles.mybutton, activeClass]}
      onPress={action}
      disabled={disabled}>
      <Text style={[styles.text, activeClass]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mybutton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
  },
});
