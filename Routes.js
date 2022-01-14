/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import ConfigButton from './src/pages/Home/components/ConfigButton';
import Details from './src/pages/Details';
import Register from './src/pages/Register';
import NewTask from './src/pages/NewTask';
import Preload from './src/pages/Preload';
import Config from './src/pages/Config';
import SelectTheme from './src/pages/SelectTheme';

import Context from './src/context';

const Stack = createStackNavigator();

export default function Route() {
  const navigationRef = useNavigationContainerRef();
  const { theme } = useContext(Context);

  const headerButton = () => {
    return (
      <ConfigButton navigation={navigationRef} />
    )
  }

  return (
    theme && (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen
          name="Preload"
          component={Preload}
          options={{
            headerShown: null,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: null,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: null,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTintColor: theme.primary,
            headerTransparent: true,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Config"
          component={Config}
          options={{
            headerTintColor: theme.primary,
            headerTransparent: true,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="SelectTheme"
          component={SelectTheme}
          options={{
            headerTintColor: theme.primary,
            headerTransparent: true,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTintColor: theme.primary,
            headerLeft: null,
            headerTransparent: true,
            headerRight: headerButton,
          }}
        />
        <Stack.Screen
          name="New Task"
          component={NewTask}
          options={{
            headerTintColor: theme.primary,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )
  );
}
