import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Context from '../provider';

import Home from '../screens/Home';
import ConfigButton from '../screens/Home/components/ConfigButton';
import Config from '../screens/Config';
import NewTask from '../screens/NewTask';
import Details from '../screens/Details';
import SelectTheme from '../screens/SelectTheme';

const Stack = createStackNavigator();

export default function AppStack({ innerRef }) {
  const { theme } = useContext(Context);
  const headerButton = () => {
    return (
      <ConfigButton navigation={innerRef} />
    );
  };

  return (
    <Stack.Navigator initialRouteName="Home">
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
        name="Config"
        component={Config}
        options={{
          headerTintColor: theme.primary,
          headerTransparent: true,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="NewTask"
        component={NewTask}
        options={{
          headerTintColor: theme.primary,
          headerTransparent: true,
          headerLeft: null,
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
        name="SelectTheme"
        component={SelectTheme}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
