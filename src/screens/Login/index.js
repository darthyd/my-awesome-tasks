import React, { useState, useEffect, useContext } from 'react';
import {
  Text, View, TouchableOpacity, StatusBar, Image, BackHandler, Alert, Keyboard
} from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../configs/firebase';

import icon from '../../../assets/icon.png';
import Context from '../../provider';

import Button from '../../components/Button';
import Input from '../../components/Input';

import stylesheet from './style';

export default function Login({ navigation }) {
  const { theme } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorState, setErrorState] = useState('');
  const styles = stylesheet(theme);

  const handleLogin = () => {
    Keyboard.dismiss();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => setErrorState(error.message));
  };

  const handleRegisterNow = () => {
    setEmail('', setPassword(''));
    navigation.navigate('Register');
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
          {'Faça login ou clique em registre-se agora \n para começar a usar'}
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
        <Button onPress={handleLogin} text="Entrar" />
        <View style={styles.notRegistered}>
          <Text style={styles.secondaryText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={handleRegisterNow}>
            <Text style={styles.link}> registre-se agora</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
