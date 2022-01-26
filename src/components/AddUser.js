import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {MyInput} from './MyInput';
import RNPickerSelect from 'react-native-picker-select';
import {MyButton} from './MyButton';
import {validate} from '../utils/utils';

export const AddUser = ({addUser, back, checkEmail}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [disabled, setDisabled] = useState(true); // Состояние кнопки отправить

  // Меняем состояние кнопки. если поля не пусты
  useEffect(() => {
    if (name && email && gender) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, gender]);

  const handleButtonClick = () => {
    // При отправке проверяем email на валидность и на наличие такого в нашем списке
    if (!validate(email)) {
      Alert.alert('Некорректный email', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (checkEmail(email)) {
      Alert.alert('Email уже используется', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      addUser({
        name,
        email,
        gender,
      });
      back(false);
    }
  };

  return (
    <View style={styles.flexContainer}>
      <View>
        <MyInput placeholder={'Имя'} value={name} change={setName} />
        <MyInput placeholder={'E-mail'} value={email} change={setEmail} />
        <RNPickerSelect
          style={styles.dropdown}
          onValueChange={value => {
            setGender(value);
          }}
          placeholder={{label: 'Пол', value: gender}}
          items={[
            {label: 'М', value: 'male'},
            {label: 'Ж', value: 'female'},
          ]}
        />
      </View>
      <MyButton
        action={handleButtonClick}
        text="Создать"
        active={true}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dropdown: {
    inputIOS: {
      padding: 10,
      backgroundColor: '#eee',
    },
    inputAndroid: {
      padding: 10,
      backgroundColor: '#eee',
    },
    placeholder: {
      backgroundColor: '#eee',
      padding: 10,
    },
  },
});
