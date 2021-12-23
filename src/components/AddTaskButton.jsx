import React, { useState, useContext } from 'react';
import { Pressable, StyleSheet, Dimensions, Text } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';

const screen = Dimensions.get('screen');

const buttonDimensionLimiter = (calc) => calc > 75 ? 75 : calc;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: buttonDimensionLimiter(screen.width / 5.6),
    height: buttonDimensionLimiter(screen.width / 5.6),
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontSize: 40,
  },
});

export default function AddTaskButton() {
  const [buttonDimensions, setButtonDimensions] = useState({});
  const { addTaskModalIsVisible, setAddTaskModalIsVisible } = useContext(GlobalProvider);

  return (
    <Pressable
      style={ styles.container }
      onLayout={ ({ nativeEvent: { layout } }) =>  setButtonDimensions(layout) }
      onPress={ () => setAddTaskModalIsVisible(!addTaskModalIsVisible) }
    >
      <Text>+</Text>
    </Pressable>
  )
}
