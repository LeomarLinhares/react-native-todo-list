import React, { useState, createContext } from 'react';

export const GlobalProvider = createContext({});

export default function GlobalContext({ children }) {
  const [taskList, setTaskList] = useState([]);
  const [addTaskModalIsVisible, setAddTaskModalIsVisible] = useState(false);

  const GlobalState = {
    taskList,
    setTaskList,
    addTaskModalIsVisible,
    setAddTaskModalIsVisible,
  };

  return (
    <GlobalProvider.Provider value={ GlobalState }>
      { children }
    </GlobalProvider.Provider>
  )
}
