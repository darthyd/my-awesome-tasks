import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../configs/firebase';
import Context from '../provider';

import { findById } from '../utils/utilsID';

/** **************************************************************
    * Hook personalizado para utilizar ou alterar dados de tarefas
    * no armazenamento remoto
    *
    * @function getTasksFromDB
    * - busca as tarefas do usuário no db
    *
    * @function syncLocalWithRemote
    * - sincroniza as tarefas com o db
  ***************************************************************** */
export default function useStore() {
  const { user } = useContext(Context);

  /** **************************************************************
    * Função que retorna um array com todas as tarefas do usuário
    * no banco de dados. Recebe como parâmetro o id do usuário
    * @params { id: id do usuário }
  ***************************************************************** */
  const getTasksFromDB = async (id = user.uid) => {
    const snapshot = await db.collection(id).get();
    const DBTasks = snapshot.docs
      .filter((doc) => doc.id.includes('task'))
      .map((task) => ({ id: task.id, ...task.data() }));
    return DBTasks;
  };

  /** **************************************************************
    * Função que sincroniza as tarefas do db com as do localstorage
    * pode receber como parâmetro um array de tarefas para sincronizar
    * caso não receba nenhum array, busca as tarefas do localstorage
    * @params { data: array de tarefas }
  ***************************************************************** */
  const syncLocalWithRemote = async (data) => {
    // busca todas as tarefas do db
    const remoteTasks = await getTasksFromDB(user.uid);
    // se não receber os dados atuais pelo paramêtro data seta os do localstorage
    const localTasks = data || await AsyncStorage.getItem('@tasks')
      .then((t) => JSON.parse(t));

    // percorre as tarefas do localstorage para encontrar as que não estão no db
    // para que sejam adicionadas
    const tasksToAdd = localTasks.filter((localTask) => !remoteTasks
      .find((remoteTask) => remoteTask.id === localTask.id));
    // percorre as tarefas do db para encontrar as que não estão mais no localstorage
    // para que sejam removidas
    const tasksToRemove = remoteTasks.filter((remoteTask) => !localTasks
      .find((localTask) => localTask.id === remoteTask.id));
    // percorre as tarefas do db para encontrar as que também estão no localstorage
    // para que sejam atualizadas se necessário
    const tasksToUpdate = remoteTasks.filter((remoteTask) => localTasks
      .find((localTask) => localTask.id === remoteTask.id));

    // remove as tarefas que não estão mais no localstorage
    tasksToRemove.forEach((task) => {
      db.collection(user.uid).doc(task.id).delete();
    });

    // adiciona as tarefas que ainda não estão no db
    tasksToAdd.forEach((task) => {
      const { id, ...taskToAdd } = task;
      db.collection(user.uid).doc(id).set(taskToAdd);
    });

    // atualiza as tarefas que estão em ambos os armazenamentos (local e db)
    tasksToUpdate.forEach((task) => {
      const { id, ...taskData } = findById(task.id, localTasks);
      db.collection(user.uid).doc(id).update(taskData);
    });

    // seta no db o tempo da ultima atualização em ms
    db.collection(user.uid).doc(user.uid).set({ lastUpdateAt: Date.now() });
  };

  return { getTasksFromDB, syncLocalWithRemote };
}
