import React, { useEffect, useContext } from 'react';
import {
  View, StatusBar, Image, Text
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import icon from '../../../assets/icon.png';
import stylesheet from './style';

import useRoutine from '../../hooks/useRoutine';
import Context from '../../context/index';

export default function Preload({ navigation }) {
  const {
    theme, auth, setAuth, user
  } = useContext(Context);
  const styles = stylesheet(theme);
  const { loginRoutine } = useRoutine();

  useEffect(() => {
    AsyncStorage.getItem('@user').then((u) => {
      return u === null ? setAuth(false) : loginRoutine(JSON.parse(u));
    });

    if (auth === null) return;
    if (!user) navigation.navigate('Login');
  }, [auth]);

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={icon}
        />
        <Text style={styles.mainText}>
          My Awesome Tasks
        </Text>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
