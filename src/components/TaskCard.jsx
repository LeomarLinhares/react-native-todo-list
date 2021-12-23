import React, { useContext } from 'react';
import { Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    width: screen.width - 100,
  },
  textStyle: {
    marginHorizontal: 10,
  }
});

export default function TaskCard({ task, id }) {
  const { taskList, setTaskList } = useContext(GlobalProvider);
  const { setItem } = useAsyncStorage('@storage_data');

  const deleteTask = async () => {
    const listWithoutDeleted = taskList.filter((element) => element.id !== id);
    setTaskList(listWithoutDeleted);
    setItem(await JSON.stringify(listWithoutDeleted));
  };

  return (
    <Pressable
      style={ { ...styles.container } }
      onLongPress={ deleteTask }
    >
      <Text style={ styles.textStyle }>{ task }</Text>
    </Pressable>
  )
}
