import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorageData = () => {
  const [storageData, setStorageData] = useState(null);

  useEffect(async () => {
    const response = await AsyncStorage.getItem('@storage_data');
    const json = response ? await JSON.parse() : [];

    setStorageData(json);
  })

  return storageData;
}

export default useStorageData