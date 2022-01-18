import React, { useEffect, useContext } from 'react';
import {
  SafeAreaView, View, Text, FlatList, StatusBar, BackHandler, Alert
} from 'react-native';

import Task from './components/Task';

import Context from '../../provider';

import FloatButton from '../../components/FloatButton';
import stylesheet from './style';

export default function Home({ navigation }) {
  const {
    theme, tasks
  } = useContext(Context);
  const styles = stylesheet(theme);

  const handleBackButton = () => {
    Alert.alert(
      'Cofirmar fechamento',
      'Fechar o aplicativo?',

      [{
        text: 'Não',
        onPress: () => {},
        style: 'cancel'
      }, {
        text: 'Sim',
        onPress: () => BackHandler.exitApp()
      }],

      {
        cancelable: false,
      }
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => handleBackButton());
  }, []);

  return (
    <>
      <View style={styles.container}>
        {tasks && tasks.length > 0 ? (
          <SafeAreaView style={styles.containerTasks}>
            <Text style={styles.mainText}>Tarefas</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={tasks}
              renderItem={({ item }) => (
                <Task
                  key={item.id}
                  data={item}
                  navigation={navigation}
                />
              )}
            />
          </SafeAreaView>
        )
          : (
            <View>
              <Text style={styles.primaryText}>Nenhuma tarefa encontrada!</Text>
              <Text style={styles.secondaryText}>Comece adicionando algumas tarefas</Text>
            </View>
          )}
        <FloatButton bottom={20} right={20} text="+" onPress={() => navigation.navigate('NewTask')} />
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
