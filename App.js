import React, { StatusBar } from 'react-native';

import Routes from './Routes';
import Provider from './src/context/provider';

export default function App() {

  return (
    <Provider>
      <Routes />
      <StatusBar barStyle="light-content" />
    </Provider>
  );
}
