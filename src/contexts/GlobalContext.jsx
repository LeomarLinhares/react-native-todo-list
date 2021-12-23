import React, { useState, createContext, useEffect } from 'react';
import useStorageData from '../hooks/useStorageData'

export const GlobalProvider = createContext({});

export default function GlobalContext({ children }) {
  const [taskList, setTaskList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true)
  const storageData = useStorageData('@storage_data');
  const [addTaskModalIsVisible, setAddTaskModalIsVisible] = useState(false);

  useEffect(() => {
    setTaskList(storageData);
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
