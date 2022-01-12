import { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import useNewTheme from '../../hooks/useNewTheme';
import Context from '../../context/index';
import themes from '../../config/themes';

import { capitalize } from '../../utils/misc';

export default function SelectedTheme() {
    const [ selectedTheme, setSelectedTheme ] = useState('');
    const { theme } = useContext(Context);
    const setNewTheme = useNewTheme();
    const styles = stylesheet(theme);

    useEffect(() => {
        AsyncStorage.getItem('@theme').then(t => {
            if(t !== null) {
                setSelectedTheme(t);
            }
        })
    }, [theme]);

    const itemList = (data) => {
        console.log(data);
        const { index } = data;
        const name = Object.keys(themes)[data.index];
        return (
        <TouchableOpacity style={ styles.itemTheme } key={name+index} onPress={() => {setSelectedTheme(name)}}>
            {selectedTheme === name ? (
                    <FontAwesome 
                        name="check" 
                        size={38} 
                        color={theme.danger}
                        style={{marginRight: 20}}
                    />
            ) : null}
            <Text style={ styles.secondaryText }>{capitalize(name)}</Text>
        </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainText}>Selecione o tema</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Object.values(themes)}
                    keyExtractor={(item) => item.background + item.primary}
                    renderItem={(item) => itemList(item)}
                />
            <TouchableOpacity style={styles.saveButton} onPress={() => setNewTheme(selectedTheme)}>
                <Text style={styles.saveButtonText}>Aplicar Tema</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
        textAlign: 'center',
        fontSize: 32,
        color: theme.text,
        opacity: 1,
        textAlign: 'center',
    },
    saveButton: {
        width: '50%',
        height: 50,
        marginBottom: 20,
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
    itemTheme: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

