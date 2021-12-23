import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalProvider = createContext({});

export default function GlobalContext({ children }) {
  const [taskList, setTaskList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [addTaskModalIsVisible, setAddTaskModalIsVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await AsyncStorage.getItem('@all_tasks');
      return response !== null ? JSON.parse(response) : null;
    };
    setIsLoadingData(true);
    setTaskList(getData());
    setIsLoadingData(false);
  }, [])

  const GlobalState = {
    taskList,
    setTaskList,
    addTaskModalIsVisible,
    setAddTaskModalIsVisible,
    isLoadingData,
  };

  return (
    <GlobalProvider.Provider value={ GlobalState }>
      { children }
    </GlobalProvider.Provider>
  )
}
