import React, { useContext, useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebase';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import Context from '../provider';
import useRoutine from '../hooks/useRoutine';
import Loading from '../components/Loading';

export default function RootNavigator() {
  const navigationRef = useNavigationContainerRef();
  const {
    user, setUser, isLoading, setIsLoading, setTheme, setTasks
  } = useContext(Context);
  const { loginRoutine, logoutRoutine } = useRoutine();

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        if (!authenticatedUser && user) logoutRoutine();
        if (!authenticatedUser) setIsLoading(false);
        if (authenticatedUser && !user) setUser(authenticatedUser, setIsLoading(true));
        if (authenticatedUser && user) {
          loginRoutine().then((resp) => {
            setTasks(resp.tasks);
            setTheme(resp.theme, setIsLoading(false));
          });
        }
      }
    );
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {user ? <AppStack innerRef={navigationRef} /> : <AuthStack />}
    </NavigationContainer>
  );
}
