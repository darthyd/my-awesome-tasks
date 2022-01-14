import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../context';
import useFirebase from './useFirebase';
import firebase from '../config/firebase';

import { findById } from '../utils/utilsID';

export default function useStore() {
  const { user, tasks } = useContext(Context);
  const { getAllTasks, newDocToDB } = useFirebase();
  const db = firebase.firestore();

  const sendTasksToLocalStorage = (data = tasks) => {
    return AsyncStorage.setItem('@tasks', JSON.stringify(data));
  };

  const getTasksFromLocalStorage = async () => {
    const local = await AsyncStorage.getItem('@tasks');
    const localTasks = local ? JSON.parse(local) : [];
    return localTasks;
  };

  const syncLocalWithRemote = async (userId = user.uid) => {
    const remoteTasks = await getAllTasks(userId);
    const localTasks = await getTasksFromLocalStorage();

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

  const getTasksFromDB = (id = user.uid) => {
    return db.collection(id).onSnapshot((snapshot) => snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const sendStateToStores = (data, syncRemote = true) => {
    sendTasksToLocalStorage(data).then(() => {
      if (syncRemote) syncLocalWithRemote();
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
