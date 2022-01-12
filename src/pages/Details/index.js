import { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, StatusBar, BackHandler } from 'react-native';

import { deleteById, updateById } from '../../utils/utilsID';
import Context from '../../context/index';

export default function Details({ route: { params: { description, status, id } }, navigation }) {
    const [ newDescription, setNewDescription ] = useState(description);

    const { theme, tasks, setTasks } = useContext(Context);
    const styles = stylesheet(theme);

    const handleSave = () => {
        Keyboard.dismiss();
        if(description !== newDescription) {
            const updatedList = updateById(id, [...tasks], { description: newDescription });
            setTasks(updatedList);
        }
        navigation.navigate('Home');
    }

    const handleDelete = () => {
        Keyboard.dismiss();
        const updatedList = deleteById(id, [...tasks]);
        
        setTasks(updatedList)
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


