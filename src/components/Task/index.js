import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { deleteById, updateById } from '../../utils/utilsID';

import Context from '../../context/index';
import useUpdateTasks from '../../hooks/useUpdateTasks';

export default function AddTask({navigation, data: { description, status, id }}) {
    const { theme, tasks, setTasks, user } = useContext(Context);
    const styles = stylesheet(theme);
    const { removeTask, editTask } = useUpdateTasks();
    
    const handleDelete = () => {
        removeTask(user.uid, id);
    }

    const handleStatus = () => {
        const updated = updateById(id, [...tasks], { status: !status });
        setTasks(updated);
        editTask(user.uid, id, { status: !status });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.checkTask}>
              <FontAwesome 
              name="check" 
              size={38} 
              color={status ? theme.primary : theme.text} 
              onPress={ handleStatus }
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.taskClickableArea}
                onPress={() => navigation.navigate('Details', { description, status, id, tasks, setTasks })}
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
    )
}

const stylesheet = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activeTaskDescription: {
        flex: 1,
        textAlign: 'center',
        color: theme.text,
        fontSize: 18,
    },
    endedTaskDescription: {
        flex: 1,
        color: theme.text,
        fontSize: 18,
        textDecorationLine: 'line-through',
        textDecorationColor: theme.primary,
    },
    taskClickableArea: {
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        color: theme.text,
    },
    deleteTask: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})

