import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../provider';
import { uniqId } from '../utils/utilsID';
import useStore from './useStore';

/** **************************************************************
    * Hook personalizado para atualizar as tarefas do usuário
    * addTask( data: dados da tarefa )
    * editTask( id: id da tarefa, task: objeto com as novas informações da tarefa )
    * deleteTask( id: id da tarefa )
  ***************************************************************** */
export default function useUpdateTasks() {
  const { tasks, setTasks } = useContext(Context);
  const { syncLocalWithRemote } = useStore();

  /** **************************************************************
    * Função que recebe um objeto de uma nova tarefa
    * e atualiza a lista de tarefas
    * @params { data: dados da tarefa }
  ***************************************************************** */
  const addTask = (data) => {
    const newTask = {
      ...data, status: false, id: uniqId('task_'), createdAt: Date.now(), latestUpdateAt: null
    };
    setTasks([...tasks, newTask]);
    AsyncStorage.setItem('@tasks', JSON.stringify([...tasks, newTask]));
    syncLocalWithRemote([...tasks, newTask]);
  };

  /** **************************************************************
    * Função que edita uma tarefa e recebe como paramêtros o id da tarefa
    * e um objeto com a atualização
    * @params { id: id da tarefa, task: objeto com as novas informações da tarefa }
  ***************************************************************** */
  const editTask = (id, data) => {
    const arrayCopy = [...tasks];
    const index = arrayCopy.findIndex((item) => item.id === id);
    arrayCopy[index] = { ...arrayCopy[index], latestUpdateAt: Date.now(), ...data };
    setTasks(arrayCopy);
    AsyncStorage.setItem('@tasks', JSON.stringify(arrayCopy));
    syncLocalWithRemote(arrayCopy);
  };

  /** **************************************************************
    * Função que deleta uma tarefa recebendo como paramêtro
    * o id da tarefa
    * @params { id: id da tarefa }
  ***************************************************************** */
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
