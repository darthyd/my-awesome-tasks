import React, { useState, useEffect, useContext } from 'react';
import {
  Text, View, TouchableOpacity, StatusBar, Image, BackHandler, Alert, Keyboard
} from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../configs/firebase';

import icon from '../../../assets/icon.png';
import Context from '../../provider';

import Button from '../../components/Button';
import Input from '../../components/Input';

import stylesheet from './style';

export default function Register({ navigation }) {
  const { theme } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorState, setErrorState] = useState('');
  const styles = stylesheet(theme);

  const handleLogin = () => {
    Keyboard.dismiss();
    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => setErrorState(error.message));
  };

  const handleAlreadyRegistered = () => {
    setEmail('', setPassword(''));
    navigation.navigate('Login');
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => navigation.goBack());
    if (errorState) {
      Alert.alert(errorState);
      setErrorState('');
    }
  }, [errorState]);

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={icon}
        />
        <Text style={styles.mainText}>My Awesome Tasks</Text>
        <Text style={styles.subtitleText}>
          <Text style={styles.subtitleText}>
            {'Registre-se ou clique em fazer login agora \n se já tiver uma conta'}
          </Text>
        </Text>
        <Input
          placeholder="Email"
          value={email}
          setter={setEmail}
        />
        <Input
          placeholder="Senha"
          secureTextEntry
          value={password}
          setter={setPassword}
        />
        <Button onPress={handleLogin} text="Registrar" />
        <View style={styles.notRegistered}>
          <Text style={styles.secondaryText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={handleAlreadyRegistered}>
            <Text style={styles.link}> faça login agora</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
