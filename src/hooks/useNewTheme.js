import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from '../context/index';
import themes from '../config/themes';

import useFirebase from './useFirebase';

const useNewTheme = () => {
  const { setTheme, user } = useContext(Context);
  const { newDocToDB } = useFirebase();

  return (theme) => {
    if (!Object.prototype.hasOwnProperty.call(themes, theme)) return;
    setTheme(themes[theme]);
    AsyncStorage.setItem('@theme', theme);
    if (user) newDocToDB(user.uid, 'theme', { theme });
  };
};

export default useNewTheme;
