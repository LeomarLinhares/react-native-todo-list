import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';
import TaskCard from './TaskCard';

const screen = Dimensions.get('screen');
const window = Dimensions.get('window');

export default function TasksBox() {
  const { taskList, isLoadingData } = useContext(GlobalProvider);

  const renderTask = ({ item }) => {
    console.log(item)
    return (
    <TaskCard
      task={ item.task }
      id={ item.id }
    />
    );
  };

  if (isLoadingData) return <View><Text>Carregando...</Text></View>
  return (
    <View
      style={ styles.container }
    >
      {
        taskList.length
          ? <FlatList
              data={ taskList }
              renderItem={ renderTask }
              keyExtractor={ item => item.id }
            />
          : <View style={ styles.noTasksContainer }>
              <Text>Toque em "+" para adicionar tarefas.</Text>
            </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: screen.width - 60,
    minHeight: window.height - 50,
  },
  noTasksContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '90%',
  },
});
