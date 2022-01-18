import React, { useContext, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, BackHandler
} from 'react-native';

import { signOut } from 'firebase/auth';
import Context from '../../provider';
import stylesheet from './style';
import { auth } from '../../configs/firebase';

export default function Config({ navigation }) {
  const { user, theme } = useContext(Context);
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
      <TouchableOpacity style={styles.button} onPress={() => null}>
        <Text style={styles.buttonText}>Sincronizar Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => signOut(auth)}
      >
        <Text style={styles.buttonTextLogout}>SAIR DA CONTA</Text>
      </TouchableOpacity>
    </View>
    )
  );
}
