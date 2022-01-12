import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from './index';

import themes from '../config/themes';

function Provider({ children }) {
  const [ theme, setTheme ] = useState(null);
  const [ auth, setAuth ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ tasks, setTasks ] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@theme').then(t => {
      t ? setTheme(themes[t]) : (setTheme(themes.default) && 
        AsyncStorage.setItem('@theme', 'default')
      );
    });
  }, [theme]);

  useEffect(() => {
    if(auth === true){
      AsyncStorage.getItem('@user')
      .then(u => JSON.parse(u))
      .then(response => {
          setUser(response.email);
      });
    } else if (auth === false) {
      setUser(null);
    }
  }, [auth]);

  const value = {
    theme,
    setTheme,
    auth,
    setAuth,
    tasks,
    setTasks,
    user,
    setUser
  };

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}

export default Provider;
