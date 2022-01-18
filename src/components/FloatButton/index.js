/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Context from '../../provider';

export default function FloatButton({
  style, onPress, text, bottom, left, right
}) {
  const { theme } = useContext(Context);

  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        onPress,
        bottom,
        right,
        left,
        ...style,
      }}
      onPress={onPress}
    >
      {text ? (
        <Text style={{
          color: theme.text,
          fontSize: 42,
          fontWeight: 'bold',
          textAlign: 'center',
          paddingBottom: 10,
        }}
        >
          {text}
        </Text>
      )
        : null}
    </TouchableOpacity>
  );
}
