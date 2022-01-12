import { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useNewTheme from '../../hooks/useNewTheme';
import Context from '../../context';

export default function Config({ navigation }) {
    const { theme, setTasks, user, setUser } = useContext(Context);
    const setNewTheme = useNewTheme();

    const styles = stylesheet(theme);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('Home');
            return true;
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Configurações</Text>            
            <Text style={styles.secondaryText}>Você está logado como: {user}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectTheme')}>
                    <Text style={styles.buttonText}>Trocar o tema</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={null}>
                    <Text style={styles.buttonText}>Limpar Tarefas Automaticamente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={null}>
                <Text style={styles.buttonText}>Sincronizar Tarefas</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.buttonLogout} 
            onPress={() => {
                AsyncStorage.multiRemove(['@tasks', '@user', '@theme']);
                setNewTheme('default');
                setTasks([]);
                setUser(null);
                navigation.navigate('Login');
            }}>
                <Text style={styles.buttonTextLogout}>SAIR DA CONTA</Text>
            </TouchableOpacity>
        </View>
    )
}



const stylesheet = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight * 2,
        backgroundColor: theme.background,
        alignItems: 'center',
    },
    mainText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: theme.primary,
        marginVertical: 20,
    },
    secondaryText: {
        fontSize: 18,
        marginBottom: 10,
        color: theme.text,
        fontStyle: 'italic',
    },
    button: {
        width: '50%',
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.primary,
        borderRadius: 10,
    },
    buttonText: {
        color: theme.text,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    buttonLogout: {
        width: '50%',
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  theme.danger,
        borderRadius: 10,
    },
    buttonTextLogout: {
        color: theme.text,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
})

