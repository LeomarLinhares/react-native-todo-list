import React, { useContext } from 'react';
import { View, Modal, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import { BlurView } from 'expo-blur';
import { GlobalProvider } from '../contexts/GlobalContext';
import InputBox from './InputBox';
import createID from '../helpers/createID';

const screen = Dimensions.get('screen');

export default function ModalHolder() {
  const { addTaskModalIsVisible, setAddTaskModalIsVisible, taskList, setTaskList } = useContext(GlobalProvider);
  const [task, setTask] = useState('')

  const handleTaskTitle = (value) => {
    setTask(value);
  };

  const addTask = () => {
    const id = createID(16);
    setTaskList([...taskList, {
      id,
      task,
    }])
  };
  
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={ true }
        visible={ addTaskModalIsVisible }
        onRequestClose={ () => setAddTaskModalIsVisible(false) }
      >
        <TouchableOpacity
          onPressOut={ () => setAddTaskModalIsVisible(false) }
        >
          <BlurView
            intensity={ 80 }
            tint='dark'
            style={ styles.touchableOpacityBox }
          >
            <TouchableWithoutFeedback>
                <View
                  style={ styles.addTaskModalView }
                >
                  <InputBox
                    title="Tarefa"
                    action={ handleTaskTitle }
                    value={ task }
                  />
                  <Button
                    title="Adicionar tarefa"
                    onPress={ addTask }
                  />
                </View>
            </TouchableWithoutFeedback>
          </BlurView>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  touchableOpacityBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  addTaskModalView: {
    width: screen.width - 100,
    padding: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#000000',
    borderColor: '#fff',
  },
});
