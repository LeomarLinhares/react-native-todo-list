import React, { useState, createContext, useEffect } from 'react';

export const ModalProvider = createContext({});

export default function ModalContext({ children }) {
  const [addTaskModalIsVisible, setAddTaskModalIsVisible] = useState(false);
  const [editTaskModalIsVisible, setEditTaskModalIsVisible] = useState(false);

  const ModalState = {
    addTaskModalIsVisible,
    setAddTaskModalIsVisible,
    editTaskModalIsVisible,
    setEditTaskModalIsVisible,
  };

  return (
    <ModalProvider.Provider value={ ModalState }>
      { children }
    </ModalProvider.Provider>
  )
}
