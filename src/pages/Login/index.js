import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, Image, BackHandler, Alert } from 'react-native';

import useFirebase from '../../hooks/useFirebase';
import useRoutine from '../../hooks/useRoutine';

import icon from '../../../assets/icon.png';
import Context from '../../context/index';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authenticateUser } = useFirebase();
    const { firstLoginRoutine } = useRoutine();
    const { theme } = useContext(Context);
    const styles = stylesheet(theme);

    const handleLogin = async () => {
        const response = await authenticateUser(email, password);
        response.user ? firstLoginRoutine(response.user) : Alert.alert('Error', response.message);
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
            <Text style={styles.subtitleText}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={styles.secondaryText}>Não tem uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}> Registre-se agora</Text>
                </TouchableOpacity>
            </View>
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
    subtitleText: {
        color: theme.text,
        fontStyle: 'italic',
    },
    secondaryText: {
        color: theme.text,
        fontSize: 18,
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
    link: {
        color: theme.primary,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
});
