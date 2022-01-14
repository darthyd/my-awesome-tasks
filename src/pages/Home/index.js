import React, { useEffect, useContext } from 'react';
import {
  View, SafeAreaView, FlatList, Text, TouchableOpacity, StatusBar, BackHandler, Alert
} from 'react-native';

import Task from './components/Task';
import Context from '../../context/index';

import stylesheet from './style';

export default function Home({ navigation }) {
  const { theme, tasks } = useContext(Context);
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
        {tasks.length > 0 ? (
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
        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => navigation.navigate('New Task')}
        >
          <Text style={styles.floatButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={theme.background} barStyle="light-content" />
    </>
  );
}
