import React, { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from './index';

import themes from '../config/themes';

function Provider({ children }) {
  const [theme, setTheme] = useState(null);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@theme').then((t) => {
      return t ? setTheme(themes[t]) : (setTheme(themes.default)
        && AsyncStorage.setItem('@theme', 'default')
      );
    });
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    auth,
    setAuth,
    tasks,
    setTasks,
    user,
    setUser
  }), [auth, tasks, theme, user]);

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  );
}

export default Provider;
