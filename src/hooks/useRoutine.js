import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../context/index';
import useNewTheme from './useNewTheme';
import useFirebase from './useFirebase';

export default function useRoutine() {
  const navigation = useNavigation();
  const { setUser, setAuth, setTasks } = useContext(Context);
  const setNewTheme = useNewTheme();
  const { findAllTasks } = useFirebase();

  const loginRoutine = (user) => {
    findAllTasks(user.uid)
      .then((tasks) => tasks.filter((task) => task.id !== user.uid))
      .then((tasks) => setTasks(tasks))
      .then(() => setUser(user))
      .then(() => setAuth(true))
      .then(() => navigation.navigate('Home'));
  };

  const logoutRoutine = () => {
    AsyncStorage.multiRemove(['@user', '@auth', '@theme']);
    navigation.navigate('Preload');
    setAuth(null);
    setUser(null);
    setNewTheme('default');
    setTasks([]);
  };

  const firstLoginRoutine = (user) => {
    AsyncStorage.setItem('@user', JSON.stringify(user))
      .then(() => loginRoutine(user));
  };

  return { loginRoutine, firstLoginRoutine, logoutRoutine };
}
