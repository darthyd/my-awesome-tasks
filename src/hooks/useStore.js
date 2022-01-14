import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../context';
import useFirebase from './useFirebase';
import firebase from '../config/firebase';

import { findById } from '../utils/utilsID';

export default function useStore() {
  const { user } = useContext(Context);
  const { newDocToDB } = useFirebase();
  const db = firebase.firestore();

  const sendTasksToLocalStorage = (data) => {
    return AsyncStorage.setItem('@tasks', JSON.stringify(data));
  };

  const getTasksFromLocalStorage = async () => {
    const local = await AsyncStorage.getItem('@tasks');
    const localTasks = local ? JSON.parse(local) : [];
    return localTasks;
  };

  const syncLocalWithRemote = async (data, userId = user.uid,) => {
    const remoteTasks = await getTasksFromDB(userId);
    const localTasks = data || await getTasksFromLocalStorage();

    const tasksToAdd = localTasks.filter((localTask) => !remoteTasks
      .find((remoteTask) => remoteTask.id === localTask.id));
    const tasksToRemove = remoteTasks.filter((remoteTask) => !localTasks
      .find((localTask) => localTask.id === remoteTask.id));
    const tasksToUpdate = remoteTasks.filter((remoteTask) => localTasks
      .find((localTask) => localTask.id === remoteTask.id));

    tasksToRemove.forEach((task) => {
      db.collection(userId).doc(task.id).delete();
    });

    tasksToAdd.forEach((task) => {
      const { id, ...taskToAdd } = task;
      newDocToDB(userId, id, taskToAdd);
    });

    tasksToUpdate.forEach((task) => {
      const { id, ...taskData } = findById(task.id, localTasks);
      db.collection(userId).doc(id).update(taskData);
    });
  };

  const getTasksFromDB = async (id = user.uid) => {
    const snapshot = await db.collection(id).get();
    const dbTasks = snapshot.docs
      .filter((doc) => doc.id.includes('task'))
      .map((task) => ({ id: task.id, ...task.data() }));
    return dbTasks;
  };

  const sendStateToStores = (data, syncRemote = true) => {
    sendTasksToLocalStorage(data).then(() => {
      if (syncRemote) syncLocalWithRemote(data);
    });
  };

  return {
    sendTasksToLocalStorage,
    getTasksFromLocalStorage,
    sendStateToStores,
    syncLocalWithRemote,
    getTasksFromDB
  };
}
