import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, StatusBar, BackHandler } from 'react-native';

import { uniqid } from '../../utils/utilsID';
import Context from '../../context/index';
import useUpdateTasks from '../../hooks/useUpdateTasks';

export default function NewTask({ navigation }) {
    const [ description, setDescription ] = useState('');
    const { theme, user } = useContext(Context);
    const { addNewTask } = useUpdateTasks();
    const styles = stylesheet(theme);

    const handleSave = () => {
        const data = { description, status: false, createdAt: Date.now(), updatedAt: null }
        Keyboard.dismiss();
        addNewTask(user.uid, data)
        navigation.navigate('Home')
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
                <Text style={styles.mainText}>Nova Tarefa</Text>
                <Text style={styles.secondaryText}>
                    Escreva aqui a descrição da tarefa
                </Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Descreva a Tarefa' 
                    placeholderTextColor={theme.text}
                    onChangeText={(text) => setDescription(text)} 
                    value={description} 
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>SALVAR</Text>
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
})

