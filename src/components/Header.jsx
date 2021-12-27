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

  const doneTasks = async () => {
    const listWithDone = taskList.reduce((acc, curr) => {
      const actualTask = selectedTasks.filter((element) => element.id === curr.id);
      const item = actualTask[0];
      if (actualTask.length > 0) return [...acc, { id: item.id, task: item.task, done: !item.done }];
      return [...acc, curr];
    }, []);
    setTaskList(listWithDone);
    setSelectedTasks([]);
    setItem(await JSON.stringify(listWithDone));
  };

  const allDoneEqualObserver = () => selectedTasks.reduce((acc, curr) => {
    if (acc.started) return { last: curr.done, result: true }
    return { last: curr.done, result: acc.last === curr.done }
  }, { started: true });

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
        {
          allDoneEqualObserver().result
            ? (
              <Feather
                style={ styles.icon }
                name={ selectedTasks[0].done ? 'divide-square' : 'check-square' }
                size={ 24 }
                color="black"
                onPress={ doneTasks }
              />
            )
            : <></>
        }
        
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
