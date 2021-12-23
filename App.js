import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AddTaskButton from './src/components/AddTaskButton';
import ModalHolder from './src/components/ModalHolder';
import GlobalContext from './src/contexts/GlobalContext';

export default function App() {
  return (
    <GlobalContext>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ModalHolder />
        <AddTaskButton />
      </View>
    </GlobalContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
