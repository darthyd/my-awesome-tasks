import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, Image, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import icon from '../../../assets/icon.png';
import Context from '../../context/index';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { theme, setAuth, setUser } = useContext(Context);
    const styles = stylesheet(theme);

    const handleLogin = async () => {
        await AsyncStorage.setItem('@user', JSON.stringify({ email }));
        setAuth(true);
        setUser(email);
        navigation.navigate('Home')
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
    }, []);

  return (
      <>
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={icon}
            />
            <Text style={styles.mainText}>My Awesome Tasks</Text>
            <Text style={styles.secondaryText}>
                Faça login ou cadastre-se para continuar
            </Text>
            <TextInput 
                style={styles.input} 
                placeholder="Email"
                placeholderTextColor={theme.text}
                value={email} 
                onChangeText={(text) => setEmail(text)} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Senha"
                placeholderTextColor={theme.text}
                secureTextEntry={true}
                value={password} 
                onChangeText={(text) => setPassword(text)} 
            />
            <TouchableOpacity style={styles.button} onPress={ handleLogin }>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
        <StatusBar backgroundColor={theme.background} barStyle='light-content' />
      </>
  );
}

const stylesheet = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 100,
        height: 100,
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
    },
});
