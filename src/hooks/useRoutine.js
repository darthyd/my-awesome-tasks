import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../provider';
import themes from '../configs/themes';
import { db } from '../configs/firebase';
import useStore from './useStore';

export default function useRoutine() {
  const {
    setTasks, setTheme, setUser, user, theme
  } = useContext(Context);
  const { getTasksFromDB, syncLocalWithRemote } = useStore();

  const loginRoutine = async (u = user) => {
    const response = { theme: { ...theme }, tasks: [] };

    // busca o tema do usuário no localstorage
    const localTheme = await AsyncStorage.getItem('@theme');
    // verifica se a requisição ao local storage retornou algum valor
    // se não retornou busca o tema do db
    if (!localTheme) {
      const config = await db.collection(u.uid).doc('config').get();
      const { theme: dbTheme } = config.data();
      // e atribui o valor retornado ao response
      response.theme = { ...themes[dbTheme], name: dbTheme };
    }

    // busca as tarefas do usuário no localstorage
    const localTasks = await AsyncStorage.getItem('@tasks');
    // verifica se a requisição ao local storage retornou algum valor
    // se não retornou busca as tarefas do db
    if (!localTasks) { // atribui o valor retornado ao response e ao localstorage
      const dbTasks = await getTasksFromDB(u.uid);
      AsyncStorage.setItem('@tasks', JSON.stringify(dbTasks));
      response.tasks = dbTasks;
    } else { // se retornou, atribui o valor retornado ao response e atualiza o db
      response.tasks = JSON.parse(localTasks);
      syncLocalWithRemote(JSON.parse(localTasks));
    }

    // retorna o response com os dados de inicialização
    return response;
  };

  const logoutRoutine = () => {
    AsyncStorage.clear();
    setTheme(themes.default);
    setUser(null);
    setTasks([]);
  };

  return { logoutRoutine, loginRoutine };
}
