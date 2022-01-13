import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../context/index';
import useNewTheme from '../hooks/useNewTheme';

export default useRoutine = () => {
    const navigation = useNavigation();
    const { setUser, setAuth, setTasks } = useContext(Context);
    const setNewTheme = useNewTheme();
    
    const loginRoutine = (user) => {
        setUser(user);
        setAuth(true);
        navigation.navigate('Home');
    }

    const logoutRoutine = () => {
        AsyncStorage.multiRemove(['@user', '@auth', '@theme', '@tasks'])
        navigation.navigate('Preload')
        setAuth(null)
        setUser(null)
        setNewTheme('default');
        setTasks([]);
    }

    const firstLoginRoutine = (user) => {
        AsyncStorage.setItem('@user', JSON.stringify(user))
            .then(() => loginRoutine(user))
    }

    return { loginRoutine, firstLoginRoutine, logoutRoutine };
}