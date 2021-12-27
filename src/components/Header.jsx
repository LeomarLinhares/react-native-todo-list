import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ModalProvider } from '../contexts/ModalContext';

const screen = Dimensions.get('screen');

export default function Header() {
  const { setSelectedTasks, selectedTasks, setTaskList, taskList } = useContext(GlobalProvider);
  const { setEditTaskModalIsVisible } = useContext(ModalProvider);
  const { setItem } = useAsyncStorage('@storage_data');

  const deleteTasks = async () => {
    const listWithoutDeleted = selectedTasks.reduce((acc, curr) => (
      acc.filter(item => item.id !== curr.id)
    ), taskList);
    setTaskList(listWithoutDeleted);
    setSelectedTasks([]);
    setItem(await JSON.stringify(listWithoutDeleted));
  };

  const selectedModRender = () => {
    return (
      <View style={ styles.styleSelectedItem }>
        <Ionicons
          style={ styles.icon }
          name="trash"
          size={ 24 }
          color="black"
          onPress={ deleteTasks }
        />
        <Feather
          name="check-square"
          size={24}
          color="black"
        />
        {
          selectedTasks.length === 1
          ? (
            <Ionicons
              style={ styles.icon }
              name="pencil"
              size={ 24 }
              color="black"
              onPress={ () => setEditTaskModalIsVisible(true) }
            />)
          : <></>
        }
      </View>
    );
  };

  return (
    <View
      style={ styles.container }
    >
      {
        selectedTasks.length > 0
          ? selectedModRender() 
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
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  icon: {
    marginHorizontal: 16,
  }
});
