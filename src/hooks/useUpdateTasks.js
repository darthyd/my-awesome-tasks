import { useContext } from 'react';
import Context from '../context';
import { uniqId } from '../utils/utilsID';

import useStore from './useStore';

export default function useUpdateTasks() {
  const { tasks, setTasks } = useContext(Context);
  const { sendStateToStores } = useStore();

  const addTask = (data) => {
    const newTask = { ...data, id: uniqId('task_') };
    setTasks([...tasks, newTask], sendStateToStores([...tasks, newTask], true));
  };

  const editTask = (id, data) => {
    const arrayCopy = [...tasks];
    const index = arrayCopy.findIndex((item) => item.id === id);
    arrayCopy[index] = { ...arrayCopy[index], ...data };
    setTasks(arrayCopy, sendStateToStores(arrayCopy, true));
  };

  const deleteTask = (id) => {
    const arrayCopy = [...tasks];
    const index = arrayCopy.findIndex((item) => item.id === id);
    arrayCopy.splice(index, 1);
    setTasks(arrayCopy, sendStateToStores(arrayCopy, true));
  };

  return { addTask, editTask, deleteTask };
}
