import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../provider';
import { uniqId } from '../utils/utilsID';
import useStore from './useStore';

export default function useUpdateTasks() {
  const { tasks, setTasks } = useContext(Context);
  const { syncLocalWithRemote } = useStore();

  const addTask = (data) => {
    const newTask = {
      ...data, status: false, id: uniqId('task_'), createdAt: Date.now(), latestUpdateAt: null
    };
    setTasks([...tasks, newTask]);
    AsyncStorage.setItem('@tasks', JSON.stringify([...tasks, newTask]));
    syncLocalWithRemote([...tasks, newTask]);
  };

  const editTask = (id, data) => {
    const arrayCopy = [...tasks];
    const index = arrayCopy.findIndex((item) => item.id === id);
    arrayCopy[index] = { ...arrayCopy[index], latestUpdateAt: Date.now(), ...data };
    setTasks(arrayCopy);
    AsyncStorage.setItem('@tasks', JSON.stringify(arrayCopy));
    syncLocalWithRemote(arrayCopy);
  };

  const deleteTask = (id) => {
    const arrayCopy = [...tasks];
    const index = arrayCopy.findIndex((item) => item.id === id);
    arrayCopy.splice(index, 1);
    setTasks(arrayCopy);
    AsyncStorage.setItem('@tasks', JSON.stringify(arrayCopy));
    syncLocalWithRemote(arrayCopy);
  };

  return { addTask, editTask, deleteTask };
}
