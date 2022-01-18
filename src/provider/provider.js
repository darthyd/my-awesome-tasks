import React, { useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from './index';

import themes from '../configs/themes';

function Provider({ children }) {
  const [theme, setTheme] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstLogin, setFirstLogin] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    // seta o tema do localstorage se diferente de null se não seta o tema padrão
    AsyncStorage.getItem('@theme')
      .then((t) => (t ? JSON.parse(t) : 'default'))
      .then((t) => setTheme({ ...themes[t], name: t }));
  }, []);

  const value = useMemo(() => ({
    theme,
    setTheme,
    tasks,
    setTasks,
    user,
    setUser,
    isLoading,
    setIsLoading,
    firstLogin,
    setFirstLogin,
  }), [tasks, theme, isLoading, user, firstLogin]);

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  );
}

export default Provider;
