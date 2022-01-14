import React, { useContext, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, BackHandler
} from 'react-native';

import useRoutine from '../../hooks/useRoutine';
import Context from '../../context';

import stylesheet from './style';

export default function Config({ navigation }) {
  const { user, theme } = useContext(Context);
  const { logoutRoutine } = useRoutine();
  const { email } = { ...user };
  const styles = stylesheet(theme);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Configurações</Text>
      <Text style={styles.secondaryText}>
        Você está logado como:
        {' '}
        {email}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectTheme')}>
        <Text style={styles.buttonText}>Trocar o tema</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={null}>
        <Text style={styles.buttonText}>Limpar Tarefas Automaticamente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={null}>
        <Text style={styles.buttonText}>Sincronizar Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={logoutRoutine}
      >
        <Text style={styles.buttonTextLogout}>SAIR DA CONTA</Text>
      </TouchableOpacity>
    </View>
  );
}
