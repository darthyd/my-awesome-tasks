/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Context from '../../../../context';

export default function configButton({ navigation }) {
  const { theme } = useContext(Context);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Config')}
      style={{
        backgroundColor: theme.primary,
        marginRight: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5
      }}
    >
      <Text style={{ color: theme.text }}>
        Config
      </Text>
    </TouchableOpacity>
  );
}
