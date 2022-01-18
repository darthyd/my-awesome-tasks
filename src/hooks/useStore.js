import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../configs/firebase';
import Context from '../provider';

import { findById } from '../utils/utilsID';

export default function useStore() {
  const { user } = useContext(Context);

  const getTasksFromDB = async (id = user.uid) => {
    const snapshot = await db.collection(id).get();
    const DBTasks = snapshot.docs
      .filter((doc) => doc.id.includes('task'))
      .map((task) => ({ id: task.id, ...task.data() }));
    return DBTasks;
  };

  const syncLocalWithRemote = async (data) => {
    const remoteTasks = await getTasksFromDB(user.uid);
    const localTasks = data || await AsyncStorage.getItem('@tasks')
      .then((t) => JSON.parse(t));

    const tasksToAdd = localTasks.filter((localTask) => !remoteTasks
      .find((remoteTask) => remoteTask.id === localTask.id));
    const tasksToRemove = remoteTasks.filter((remoteTask) => !localTasks
      .find((localTask) => localTask.id === remoteTask.id));
    const tasksToUpdate = remoteTasks.filter((remoteTask) => localTasks
      .find((localTask) => localTask.id === remoteTask.id));

    tasksToRemove.forEach((task) => {
      db.collection(user.uid).doc(task.id).delete();
    });

    tasksToAdd.forEach((task) => {
      const { id, ...taskToAdd } = task;
      db.collection(user.uid).doc(id).set(taskToAdd);
    });

    tasksToUpdate.forEach((task) => {
      const { id, ...taskData } = findById(task.id, localTasks);
      db.collection(user.uid).doc(id).update(taskData);
    });

    db.collection(user.uid).doc(user.uid).set({ lastUpdateAt: Date.now() });
  };

  return { getTasksFromDB, syncLocalWithRemote };
}
