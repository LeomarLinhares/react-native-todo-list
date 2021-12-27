import React, { useState, useContext, useEffect } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Button } from 'react-native';
import { BlurView } from 'expo-blur';
import { ModalProvider } from '../contexts/ModalContext';
import InputBox from './InputBox';
import { GlobalProvider } from '../contexts/GlobalContext';

const screen = Dimensions.get('screen');

export default function ModalEditTask() {
  const { selectedTasks } = useContext(GlobalProvider);
  const [task, setTask] = useState('');
  const { editTaskModalIsVisible, setEditTaskModalIsVisible } = useContext(ModalProvider);

  useEffect(() => {
    if (selectedTasks.length > 0) {
      setTask(selectedTasks[0].task);
    }
  }, [selectedTasks])

  return (
    <Modal
      animationType="fade"
      transparent={ true }
      visible={ editTaskModalIsVisible }
      onRequestClose={ () => setEditTaskModalIsVisible(false) }
    >
      <TouchableOpacity
        onPressOut={ () => setEditTaskModalIsVisible(false) }
      >
        <BlurView
          intensity={ 80 }
          tint='dark'
          style={ styles.touchableOpacityBox }
        >
          <TouchableWithoutFeedback>
              <View
                style={ styles.editTaskModalView }
              >
                <InputBox
                  title="Editando tarefa"
                  action={ () => console.log('input') }
                  value={ task }
                />
                <Button
                  title="Editar tarefa"
                  onPress={ () => console.log('edita') }
                  color="#0c4b5e"
                />
              </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  touchableOpacityBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTaskModalView: {
    width: screen.width - 100,
    padding: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#000000',
    borderColor: 'black',
  },
});
