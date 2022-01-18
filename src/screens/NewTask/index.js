import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, Keyboard, StatusBar, BackHandler
} from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Context from '../../provider';
import useUpdateTasks from '../../hooks/useUpdateTasks';
import stylesheet from './style';

export default function NewTask({ navigation }) {
  const [description, setDescription] = useState('');
  const { theme } = useContext(Context);
  const { addTask } = useUpdateTasks();
  const styles = stylesheet(theme);

  const handleSave = () => {
    Keyboard.dismiss();
    addTask({ description });
    navigation.navigate('Home');
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => navigation.goBack());
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>Nova Tarefa</Text>
        <Text style={styles.secondaryText}>
          Escreva aqui a descrição da tarefa
        </Text>
        <Input
          placeholder="Descreva a Tarefa"
          setter={setDescription}
          value={description}
        />
        <Button text="Salvar" onPress={handleSave} />
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
