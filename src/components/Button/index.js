/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Context from '../../provider';

export default function Button({
  style, onPress, text, color
}) {
  const { theme } = useContext(Context);

  const backgroundColor = theme[color] || theme.primary;

  return (
    <TouchableOpacity
      style={{
        width: '50%',
        height: 50,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        borderRadius: 10,
        ...style
      }}
      onPress={onPress}
    >
      <Text style={{
        color: theme.text,
        fontWeight: 'bold',
        fontSize: 20,
      }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
