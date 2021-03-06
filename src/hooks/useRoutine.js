import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../provider';
import themes from '../configs/themes';
import { db } from '../configs/firebase';
import useStore from './useStore';

/** **************************************************************
    * Hook personalizado para realizar rotinas comuns na aplicação
    * ex: rotinas de login, logout, etc
    *
    * @function loginRoutine
    * - realiza a rotina pós login do usuário
    *
    * @function logoutRoutine
    * - realiza a rotina pós logout do usuário
  ***************************************************************** */
export default function useRoutine() {
  const {
    setTasks, setTheme, setUser, user, theme
  } = useContext(Context);
  const { getTasksFromDB, syncLocalWithRemote } = useStore();

  /** **************************************************************
    * Rotina para quando o usuário loga no app
    * @params { user: objeto com as informações do usuário }
  ***************************************************************** */
  const loginRoutine = async (u = user) => {
    const response = { theme: { ...theme }, tasks: [] };

    // busca o tema do usuário no localstorage
    const localTheme = await AsyncStorage.getItem('@theme');
    // verifica se a requisição ao local storage retornou algum valor
    if (!localTheme) {
      // se não retornou busca o tema do db
      const config = await db.collection(u.uid).doc('config').get();
      // se não retornou o seta o tema padrão para o db e para o local
      const newTheme = config.data()?.theme || 'default';
      if (!config.data()?.theme) db.collection(u.uid).doc('config').set({ theme: 'default' });
      AsyncStorage.setItem('@theme', newTheme);
      response.theme = { ...themes[newTheme], name: newTheme };
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

  /** **************************************************************
    * Rotina para quando o usuário faz logout do app
  ***************************************************************** */
  const logoutRoutine = () => {
    AsyncStorage.clear();
    setTheme(themes.default);
    setUser(null);
    setTasks([]);
  };

  return { logoutRoutine, loginRoutine };
}
