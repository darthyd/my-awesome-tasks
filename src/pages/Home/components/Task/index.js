import React, { useContext } from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { updateById } from '../../../../utils/utilsID';

import stylesheet from './style';

import Context from '../../../../context';
import useUpdateTasks from '../../../../hooks/useUpdateTasks';

export default function AddTask({ navigation, data: { description, status, id } }) {
  const {
    theme, tasks, setTasks, user
  } = useContext(Context);

  const { removeTask, editTask } = useUpdateTasks();
  const styles = stylesheet(theme);

  const handleDelete = () => {
    removeTask(user.uid, id);
  };

  const handleStatus = () => {
    const updatedAt = Date.now();
    const updated = updateById(id, [...tasks], { status: !status, updatedAt });
    setTasks(updated);
    editTask(user.uid, id, { status: !status, updatedAt });
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
          description, status, id, tasks, setTasks
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
