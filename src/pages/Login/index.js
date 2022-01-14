import React, { useState, useEffect, useContext } from 'react';
import {
  Text, TextInput, View, TouchableOpacity, StatusBar, Image, BackHandler, Alert
} from 'react-native';

import useFirebase from '../../hooks/useFirebase';
import useRoutine from '../../hooks/useRoutine';

import icon from '../../../assets/icon.png';
import Context from '../../context/index';

import stylesheet from './style';

export default function Login({ navigation }) {
  const { theme } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticateUser } = useFirebase();
  const { firstLoginRoutine } = useRoutine();
  const styles = stylesheet(theme);

  const handleLogin = async () => {
    const response = await authenticateUser(email, password);
    return response.user ? firstLoginRoutine(response.user) : Alert.alert('Error', response.message);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={icon}
        />
        <Text style={styles.mainText}>My Awesome Tasks</Text>
        <Text style={styles.subtitleText}>
          Faça login ou cadastre-se para continuar
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.text}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={theme.text}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.notRegistered}>
          <Text style={styles.secondaryText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}> registre-se agora</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
