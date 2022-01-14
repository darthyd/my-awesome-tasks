import React, { useContext } from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import stylesheet from './style';

import Context from '../../../../context';
import useUpdateTasks from '../../../../hooks/useUpdateTasks';

export default function AddTask({ navigation, data: { description, status, id } }) {
  const { theme } = useContext(Context);

  const { deleteTask, editTask } = useUpdateTasks();
  const styles = stylesheet(theme);

  const handleDelete = () => {
    deleteTask(id);
  };

  const handleStatus = () => {
    const updatedAt = Date.now();
    editTask(id, { status: !status, updatedAt });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkTask}>
        <FontAwesome
          name="check"
          size={38}
          color={status ? theme.success : theme.text}
          onPress={handleStatus}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.taskClickableArea}
        onPress={() => navigation.navigate('Details', {
          description, status, id
        })}
      >
        <Text
          style={status ? styles.endedTaskDescription : styles.activeTaskDescription}
        >
          { description }
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteTask} onPress={handleDelete}>
        <FontAwesome
          name="trash"
          size={38}
          color={theme.danger}
        />
      </TouchableOpacity>
    </View>
  );
}
