import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../context/index';
import useNewTheme from './useNewTheme';

import useStore from './useStore';

export default function useRoutine() {
  const navigation = useNavigation();
  const {
    setUser, setAuth, setTasks, tasks
  } = useContext(Context);
  const setNewTheme = useNewTheme();
  const {
    sendStateToStores, syncLocalWithRemote, getTasksFromLocalStorage, getTasksFromDB
  } = useStore();

  const loginRoutine = (user) => {
    getTasksFromLocalStorage()
      .then((t) => setTasks(t, syncLocalWithRemote(t, user.uid)))
      .then(() => setUser(user))
      .then(() => setAuth(true))
      .then(() => navigation.navigate('Home'));
  };

  const logoutRoutine = () => {
    AsyncStorage.multiRemove(['@user', '@auth', '@tasks'])
      .then(() => syncLocalWithRemote([...tasks]))
      .then(() => setTasks([]))
      .then(() => setNewTheme('default'))
      .then(() => setAuth(null))
      .then(() => setUser(null))
      .then(() => navigation.navigate('Login'));
  };

  const firstLoginRoutine = async (user) => {
    const getTasks = await getTasksFromDB(user.uid);
    AsyncStorage.setItem('@user', JSON.stringify(user))
      .then(() => setTasks(getTasks, sendStateToStores(getTasks, false)))
      .then(() => setUser(user))
      .then(() => setAuth(true))
      .then(() => navigation.navigate('Home'));
  };

  return { loginRoutine, firstLoginRoutine, logoutRoutine };
}
