import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Keyboard, StatusBar, BackHandler
} from 'react-native';

import Context from '../../context/index';
import useUpdateTasks from '../../hooks/useUpdateTasks';
import stylesheet from './style';

export default function Details({ route: { params: { description, id } }, navigation }) {
  const [newDescription, setNewDescription] = useState(description);
  const { editTask, deleteTask } = useUpdateTasks();
  const { theme, user } = useContext(Context);
  const styles = stylesheet(theme);

  const handleSave = () => {
    Keyboard.dismiss();
    if (description !== newDescription) {
      const updatedAt = Date.now();
      editTask(id, { description: newDescription, updatedAt });
    }
    navigation.navigate('Home');
  };

  const handleDelete = () => {
    Keyboard.dismiss();
    deleteTask(user.uid, id);
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
        <Text style={styles.mainText}>Editar Tarefa</Text>
        <Text style={styles.secondaryText}>
          Edite sua tarefa
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Descreva a Tarefa"
          placeholderTextColor={theme.text}
          onChangeText={(text) => setNewDescription(text)}
          value={newDescription}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Excluir Tarefa</Text>
        </TouchableOpacity>
        <Text style={styles.secondaryText}>{id}</Text>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
