import { useEffect, useContext } from 'react';
import { StyleSheet, View, StatusBar, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import icon from '../../../assets/icon.png';
import { sleep } from  '../../utils/misc';

import Context from '../../context/index';

export default function Preload({ navigation }) {
    const { theme, auth, setAuth } = useContext(Context);
    const styles = stylesheet(theme);

    useEffect(() => {
        AsyncStorage.getItem('@user').then(user => {
            user === null ? setAuth(false) : setAuth(true);
        })

        if(auth === null) return
        sleep(2000).then(() => {
            auth ? navigation.navigate('Home') : navigation.navigate('Login')
        })
    }, [auth]);

  return (
      <>
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={icon}
            />
            <Text style={styles.mainText}>
                My Awesome Tasks
            </Text>
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
    mainText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: theme.primary,
    },
    icon: {
        width: 100,
        height: 100,
    }
});
