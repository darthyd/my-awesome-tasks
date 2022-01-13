import { useEffect, useContext } from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, StatusBar, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from '../../components/Task';

import Context from '../../context/index';

export default function Home({ navigation }) {
    const { theme, tasks, setTasks, user } = useContext(Context);
    const styles = stylesheet(theme);

    console.log(user.email, user.uid);

    const handleBackButton = () => {               
        Alert.alert(
            'Cofirmar fechamento',
            'Fechar o aplicativo?', [{
                text: 'Não',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'Sim',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false,
            }
         )
         return true;
       }

    useEffect(() => {
        if(tasks.length === 0) {
            AsyncStorage.getItem('@tasks').then(store => {
                if(store) {
                    setTasks(JSON.parse(store));
                }
            });
        }
        BackHandler.addEventListener('hardwareBackPress', () => handleBackButton());

    }, []);


    useEffect(() => {
        AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    } , [tasks]);

    return (
        <>
            <View style={styles.container}>
                {tasks.length > 0 ? <SafeAreaView style={styles.containerTasks}>
                    <Text style={styles.mainText}>Tarefas</Text>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={tasks}
                    renderItem={({ item }) => <Task 
                        key={item.id} 
                        data={item}
                        navigation={navigation}
                    />}
                    />
                </SafeAreaView>
                : <View> 
                    <Text style={styles.primaryText}>Nenhuma tarefa encontrada!</Text>
                    <Text style={styles.secondaryText}>Comece adicionando algumas tarefas</Text>
                </View>}
                <TouchableOpacity 
                    style={styles.floatButton} 
                    onPress={ () => navigation.navigate('New Task') }
                    >
                <Text style={styles.floatButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <StatusBar backgroundColor={theme.background} barStyle='light-content' />
        </>
    )
}

const stylesheet = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: StatusBar.currentHeight * 2,
    },
    floatButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    floatButtonText: {
        color: theme.text,
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10,
    },
    mainText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: theme.primary,
        textAlign: 'center',
        marginVertical: 20,
    },
    primaryText: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: 40,
        color: theme.text,
    },
    secondaryText: {
        textAlign: 'center',
        fontSize: 16,
        color: theme.text,
    }
})

