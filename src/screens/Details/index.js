import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text, Keyboard, StatusBar, BackHandler
} from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Context from '../../provider';
import useUpdateTasks from '../../hooks/useUpdateTasks';
import stylesheet from './style';

export default function Details({ route: { params: { description, id } }, navigation }) {
  const [newDescription, setNewDescription] = useState(description);
  const { editTask, deleteTask } = useUpdateTasks();
  const { theme, user } = useContext(Context);
  const styles = stylesheet(theme);

  const handleSave = () => {
    Keyboard.dismiss();
    if (description !== newDescription) editTask(id, { description: newDescription });
    navigation.navigate('Home');
  };

  const handleDelete = () => {
    Keyboard.dismiss();
    deleteTask(user.uid, id);
    navigation.navigate('Home');
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => navigation.goBack());
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>Editar Tarefa</Text>
        <Text style={styles.secondaryText}>
          Edite sua tarefa
        </Text>
        <Input
          placeholder="Descreva a Tarefa"
          setter={setNewDescription}
          value={newDescription}
        />
        <Button text="Salvar Alterações" onPress={handleSave} />
        <Button text="Excluir Tarefa" color="danger" onPress={handleDelete} />
        <Text style={styles.secondaryText}>{id}</Text>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
