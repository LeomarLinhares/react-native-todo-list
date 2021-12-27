import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  iconStyle: {
    height: 80,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  }
});

export default function AddTaskButton() {
  const { addTaskModalIsVisible, setAddTaskModalIsVisible } = useContext(GlobalProvider);

  return (
      <Ionicons
        name="add-circle"
        size={ 80 }
        color="black"
        style={ styles.iconStyle }
        onPress={ () => setAddTaskModalIsVisible(!addTaskModalIsVisible) }
      />
  )
}
