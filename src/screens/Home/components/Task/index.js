import React, { useContext } from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import useUpdateTasks from '../../../../hooks/useUpdateTasks';
import Context from '../../../../provider';
import stylesheet from './style';

export default function Task({
  navigation, data: {
    description, status, id
  }
}) {
  const {
    theme
  } = useContext(Context);
  const { deleteTask, editTask } = useUpdateTasks();
  const styles = stylesheet(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkTask}>
        <FontAwesome
          name="check"
          size={38}
          color={status ? theme.success : theme.text}
          onPress={() => editTask(id, { status: !status })}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.taskClickableArea}
        onPress={() => navigation.navigate('Details', {
          description, id
        })}
      >
        <Text
          style={status ? styles.endedTaskDescription : styles.activeTaskDescription}
        >
          { description }
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteTask} onPress={() => deleteTask(id)}>
        <FontAwesome
          name="trash"
          size={38}
          color={theme.danger}
        />
      </TouchableOpacity>
    </View>
  );
}
