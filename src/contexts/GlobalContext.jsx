import React, { useState, createContext, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export const GlobalProvider = createContext({});

export default function GlobalContext({ children }) {
  const [taskList, setTaskList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true)
  const { getItem } = useAsyncStorage('@storage_data')
  const [addTaskModalIsVisible, setAddTaskModalIsVisible] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const readItemFromStorage = async () => {
    const list = await getItem();
    const data = await JSON.parse(list);
    setTaskList(data)
  }

  useEffect(() => {
    readItemFromStorage();
    setIsLoadingData(false);
  }, [])

  const GlobalState = {
    taskList,
    setTaskList,
    addTaskModalIsVisible,
    setAddTaskModalIsVisible,
    isLoadingData,
    selectedTasks,
    setSelectedTasks,
  };

  return (
    <GlobalProvider.Provider value={ GlobalState }>
      { children }
    </GlobalProvider.Provider>
  )
}
