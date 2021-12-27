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
  const { taskList, setTaskList, selectedTasks, setSelectedTasks } = useContext(GlobalProvider);
  const { setItem } = useAsyncStorage('@storage_data');

  const deleteTask = async () => {
    const listWithoutDeleted = taskList.filter((element) => element.id !== id);
    setTaskList(listWithoutDeleted);
    setItem(await JSON.stringify(listWithoutDeleted));
  };

  const isSelected = () => (
    selectedTasks
      .filter((selectedTask) => id === selectedTask.id)
      .length > 0
  );

  const styleHandle = (isPressed) => {
    if (isSelected()) {
      return [styles.container, { backgroundColor: '#dee2e6' }]
    } else {
      return [styles.container, { backgroundColor: isPressed ? '#dee2e6' : 'white' }]
    }
  };

  return (
    <Pressable
      style={ ({ pressed }) => styleHandle(pressed) }
      onLongPress={ () => {
        setSelectedTasks([...selectedTasks, { id, task }]);
      } }
      onPress={ () => {
        if (isSelected()) {
          setSelectedTasks(selectedTasks.filter((element) => element.id !== id));
        } else if (selectedTasks.length > 0) {
          setSelectedTasks([...selectedTasks, { id, task }]);
        }
      } }
    >
      <Text style={ styles.textStyle }>{ task }</Text>
    </Pressable>
  )
}
