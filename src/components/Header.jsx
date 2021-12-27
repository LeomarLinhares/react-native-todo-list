import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const screen = Dimensions.get('screen');

export default function Header() {
  const { setSelectedTasks, selectedTasks, setTaskList, taskList } = useContext(GlobalProvider);
  const { setItem } = useAsyncStorage('@storage_data');

  const deleteTasks = async () => {
    const listWithoutDeleted = selectedTasks.reduce((acc, curr) => (
      acc.filter(item => item.id !== curr.id)
    ), taskList);
    setTaskList(listWithoutDeleted);
    setSelectedTasks([]);
    setItem(await JSON.stringify(listWithoutDeleted));
  };

  return (
    <View
      style={ styles.container }
    >
      {
        selectedTasks.length > 0
          ? (
          <View style={ styles.styleSelectedItem }>
            <Ionicons
              name="trash"
              size={ 24 }
              color="black"
              onPress={ deleteTasks }
            />
          </View>)
          : <Text style={ styles.text }>Lista de tarefas</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: screen.width - 40,
    height: 50,
  },
  text: {
    fontSize: 28,
  },
  styleSelectedItem: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
  }
});
