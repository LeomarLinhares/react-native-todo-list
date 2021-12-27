import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AddTaskButton from './src/components/AddTaskButton';
import Header from './src/components/Header';
import ModalHolder from './src/components/ModalHolder';
import TasksBox from './src/components/TasksBox';
import GlobalContext from './src/contexts/GlobalContext';

export default function App() {
  return (
    <GlobalContext>
      <View style={styles.container}>
        <Header />
        <TasksBox />
        <ModalHolder />
        <AddTaskButton />
        <StatusBar style="auto" />
      </View>
    </GlobalContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
  },
});
