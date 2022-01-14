import React, { useState, useEffect, useContext } from 'react';
import {
  Text, TextInput, View, TouchableOpacity, StatusBar, Image, BackHandler, Alert
} from 'react-native';

import useFirebase from '../../hooks/useFirebase';
import useRoutine from '../../hooks/useRoutine';

import icon from '../../../assets/icon.png';
import Context from '../../context/index';
import stylesheet from './style';

export default function Register({ navigation }) {
  const { theme, user } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useFirebase();
  const { firstLoginRoutine } = useRoutine(user);
  const styles = stylesheet(theme);

  const handleRegister = async () => {
    const response = await registerUser(email, password);
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
          Registre-se para começar a usar o My Awesome Tasks
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <View style={styles.alreadyRegistered}>
          <Text style={styles.secondaryText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}> clique e faça login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
