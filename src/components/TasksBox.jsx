import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import { GlobalProvider } from '../contexts/GlobalContext';
import TaskCard from './TaskCard';

export default function TasksBox() {
  const { taskList } = useContext(GlobalProvider);

  const renderTask = ({ item }) => <TaskCard task={ item.title } />;

  return (
    <View>
      <FlatList
        data={ taskList }
        renderItem={ renderTask }
        keyExtractor={ item => item.id }
      />
    </View>
  )
}
