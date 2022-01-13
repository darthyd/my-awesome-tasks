import { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, StatusBar, BackHandler } from 'react-native';

import { deleteById, updateById } from '../../utils/utilsID';
import Context from '../../context/index';
import useUpdateTasks from '../../hooks/useUpdateTasks';

export default function Details({ route: { params: { description, status, id } }, navigation }) {
    const [ newDescription, setNewDescription ] = useState(description);
    const { editTask, removeTask } = useUpdateTasks();
    const { theme, tasks, setTasks, user } = useContext(Context);
    const styles = stylesheet(theme);

    const handleSave = () => {
        Keyboard.dismiss();
        if(description !== newDescription) {
            const updateAt = Date.now()
            const updatedList = updateById(id, [...tasks], { description: newDescription, updateAt });
            setTasks(updatedList);
            editTask(user.uid, id, { description: newDescription, updateAt });
        }
        navigation.navigate('Home');
    }

    const handleDelete = () => {
        Keyboard.dismiss();
        removeTask(user.uid, id);
        navigation.navigate('Home');
    }

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
                <TextInput style={styles.input} 
                    placeholder='Descreva a Tarefa'
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
            <StatusBar backgroundColor={theme.background} barStyle='light-content' />
        </>
    )
}

const stylesheet = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight * 2,
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    mainText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: theme.primary,
    },
    secondaryText: {
        color: theme.text,
        fontStyle: 'italic',
    },
    input: {
        width: '80%',
        height: 50,
        fontSize: 18,
        paddingLeft: 10,
        color: theme.text,
        borderBottomWidth: 1,
        borderColor: theme.primary,
        marginTop: 20,
    },
    saveButton: {
        width: '50%',
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.primary,
        borderRadius: 10,
    },
    saveButtonText: {
        color: theme.text,
        fontWeight: 'bold',
        fontSize: 20,
    },
    deleteButton: {
        width: '50%',
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  theme.danger,
        borderRadius: 10,
    },
    deleteButtonText: {
        color: theme.text,
        fontWeight: 'bold',
        fontSize: 20,
    },
})


