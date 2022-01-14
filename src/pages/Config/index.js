import React, { useContext, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, BackHandler
} from 'react-native';

import useRoutine from '../../hooks/useRoutine';
import useStore from '../../hooks/useStore';
import Context from '../../context';

import stylesheet from './style';

export default function Config({ navigation }) {
  const { user, theme, tasks } = useContext(Context);
  const { logoutRoutine } = useRoutine();
  const { syncLocalWithRemote } = useStore();
  const styles = stylesheet(theme);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });
  }, []);

  return (
    user && (
    <View style={styles.container}>
      <Text style={styles.mainText}>Configurações</Text>
      <Text style={styles.secondaryText}>
        Você está logado como:
        {' '}
        {user.email}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectTheme')}>
        <Text style={styles.buttonText}>Trocar o tema</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={null}>
        <Text style={styles.buttonText}>Limpar Tarefas Automaticamente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => syncLocalWithRemote(tasks)}>
        <Text style={styles.buttonText}>Sincronizar Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={logoutRoutine}
      >
        <Text style={styles.buttonTextLogout}>SAIR DA CONTA</Text>
      </TouchableOpacity>
    </View>
    )
  );
}
