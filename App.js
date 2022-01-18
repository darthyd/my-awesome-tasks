import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import Provider from './src/provider/provider';

export default function App() {

  return (
    <Provider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
      <StatusBar barStyle="light-content" />
    </Provider>
  );
}
