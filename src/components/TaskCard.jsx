import React, { useContext } from 'react';
import { Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';
import { Feather } from '@expo/vector-icons';
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

export default function TaskCard({ task, id, done }) {
  const { selectedTasks, setSelectedTasks, taskList, setTaskList } = useContext(GlobalProvider);
  const { setItem } = useAsyncStorage('@storage_data');

  const onLongPressHandle = () => {
    const doesThisObjectExistInTheSelectedTasks = selectedTasks.some((element) => element.id === id);
    if (!doesThisObjectExistInTheSelectedTasks) {
      setSelectedTasks([...selectedTasks, { id, task, done }]);
    }
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

  const doneOrUndoneTask = async () => {
    const listWithDonePropertyModified = taskList.reduce((acc, curr) => {
      if (curr.id === id) return [...acc, { task, id, done: !done }];
      return [...acc, curr];
    }, [])
    setTaskList(listWithDonePropertyModified);
    setItem(await JSON.stringify(listWithDonePropertyModified));
  };

  return (
    <Pressable
      style={ ({ pressed }) => styleHandle(pressed) }
      onLongPress={ onLongPressHandle }
      onPress={ () => {
        if (isSelected()) {
          setSelectedTasks(selectedTasks.filter((element) => element.id !== id));
        } else if (selectedTasks.length > 0) {
          setSelectedTasks([...selectedTasks, { id, task, done }]);
        }
      } }
    >
      {
        done
          ? <Feather
              style={ styles.textStyle }
              name="check-square"
              size={ 24 }
              color="black"
              onPress={ doneOrUndoneTask }
            />
          : <Feather
              style={ styles.textStyle }
              name="square"
              size={ 24 }
              color="black"
              onPress={ doneOrUndoneTask }
            />
      }
      <Text style={ {...styles.textStyle,  textDecorationLine: done ? 'line-through' : 'none' } }>{ task }</Text>
    </Pressable>
  )
}
