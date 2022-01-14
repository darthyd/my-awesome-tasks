import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../context/index';
import useNewTheme from './useNewTheme';

import useStore from './useStore';

export default function useRoutine() {
  const navigation = useNavigation();
  const { setUser, setAuth, setTasks } = useContext(Context);
  const setNewTheme = useNewTheme();
  const { sendStateToStores, syncLocalWithRemote, getTasksFromLocalStorage } = useStore();

  const loginRoutine = (user) => {
    getTasksFromLocalStorage()
      .then((tasks) => setTasks(tasks, syncLocalWithRemote(user.uid)))
      .then(() => setUser(user))
      .then(() => setAuth(true))
      .then(() => navigation.navigate('Home'));
  };

  const logoutRoutine = () => {
    sendStateToStores().then(() => {
      AsyncStorage.clear().then(() => {
        setUser(null);
        setAuth(false);
        setTasks([]);
        setNewTheme(false);
      });
    }).then(() => navigation.navigate('Login'));
  };

  const firstLoginRoutine = async (user) => {
    const getTasksFromDB = await getTasksFromDB(user.uid);
    AsyncStorage.setItem('@user', JSON.stringify(user))
      .then(() => setTasks(getTasksFromDB, sendStateToStores(false)))
      .then(() => setUser(user))
      .then(() => setAuth(true))
      .then(() => navigation.navigate('Home'));
  };

  return { loginRoutine, firstLoginRoutine, logoutRoutine };
}
