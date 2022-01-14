import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Keyboard, StatusBar, BackHandler
} from 'react-native';

import Context from '../../context/index';
import useUpdateTasks from '../../hooks/useUpdateTasks';
import stylesheet from './style';

export default function NewTask({ navigation }) {
  const [description, setDescription] = useState('');
  const { theme, user } = useContext(Context);
  const { addNewTask } = useUpdateTasks();
  const styles = stylesheet(theme);

  const handleSave = () => {
    const data = {
      description, status: false, createdAt: Date.now(), updatedAt: null
    };
    Keyboard.dismiss();
    addNewTask(user.uid, data);
    navigation.navigate('Home');
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>Nova Tarefa</Text>
        <Text style={styles.secondaryText}>
          Escreva aqui a descrição da tarefa
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Descreva a Tarefa"
          placeholderTextColor={theme.text}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>

  );
}
