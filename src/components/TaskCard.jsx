import React, { useContext } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  textStyle: {
    marginHorizontal: 10,
  }
});

export default function TaskCard({ task, fatherLayoutInfo, id }) {
  const { taskList, setTaskList } = useContext(GlobalProvider)
  const { width } = fatherLayoutInfo;

  const deleteTask = () => {
    const listWithoutDeleted = taskList.filter((element) => element.id !== id);
    setTaskList(listWithoutDeleted);
  };

  return (
    <Pressable
      style={ { ...styles.container, width: width - 10 } }
      onLongPress={ deleteTask }
    >
      <Text style={ styles.textStyle }>{ task }</Text>
    </Pressable>
  )
}
