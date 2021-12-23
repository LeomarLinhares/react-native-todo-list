import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorageData = (item) => {
  const [storageData, setStorageData] = useState([]);

  useEffect(async () => {
    try {
      const response = await AsyncStorage.getItem(item);
      const json = response ? await JSON.parse() : [];   
      setStorageData(json);
    } catch (error) {
      console.log(error)
    }
  })

  return storageData;
}

export default useStorageData;