import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from '../context/index';
import themes from '../config/themes';

const useNewTheme = () => {
    const { theme: currentTheme, setTheme } = useContext(Context);

    return (theme) => {
        if(!themes.hasOwnProperty(theme)) return; 
        setTheme(themes[theme])
        AsyncStorage.setItem('@theme', theme);
    }
}

export default useNewTheme;