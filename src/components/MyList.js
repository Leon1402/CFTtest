import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

// Элементы списка( не сттал выносить отдельно)
const Item = ({content}) => {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{content.name}</Text>
        <Text style={styles.email}>{content.email}</Text>
      </View>
      <View>
        <Text style={styles.gender}>{content.gender}</Text>
      </View>
    </View>
  );
};

//Список пользлователей
export const MyList = ({users}) => {
  // Если мписок пуст, будет выведено сообщение с подсказкой, что данные еще не загрузились
  return users.length ? (
    <FlatList
      style={styles.list}
      data={users}
      renderItem={({item}) => <Item content={item} />}
      keyExtractor={item => item.id}
    />
  ) : (
    <Text>loading</Text>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  name: {
    marginBottom: 5,
    fontSize: 18,
  },
  email: {
    color: '#666',
  },
  gender: {
    fontSize: 16,
  },
});
