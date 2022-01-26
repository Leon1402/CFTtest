/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AddUser} from './components/AddUser';
import {MyButton} from './components/MyButton';
import {observer} from 'mobx-react-lite';
import {MyState} from './mobX/state';
import {MyList} from './components/MyList';

const myData = new MyState();

const App = observer(() => {
  const [isAddNewUser, setIsAddNewUser] = useState(false); //Переход между экранами false - cписок пользователей, true - добавить нового
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  };

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.sectionContainer}>
          <View style={styles.button}>
            <MyButton
              action={() => {
                setIsAddNewUser(false);
              }}
              text="Пользователи"
              active={!isAddNewUser}
            />
          </View>
          <View style={styles.button}>
            <MyButton
              action={() => {
                setIsAddNewUser(true);
              }}
              text="Новый пользователь"
              active={isAddNewUser}
            />
          </View>
        </View>
        {isAddNewUser ? (
          <AddUser
            addUser={myData.addUser}
            back={setIsAddNewUser}
            checkEmail={myData.checkEmail}
          />
        ) : (
          <MyList users={myData.users} />
        )}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    width: '40%',
  },
});

export default App;
