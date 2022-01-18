/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { TextInput } from 'react-native';

import Context from '../../provider';

export default function Input({
  style, placeholder, setter, value,
  secureTextEntry
}) {
  const { theme } = useContext(Context);

  return (
    <TextInput
      style={{
        width: '80%',
        height: 50,
        fontSize: 18,
        paddingLeft: 10,
        color: theme.text,
        borderBottomWidth: 1,
        borderColor: theme.primary,
        marginTop: 20,
        ...style
      }}
      placeholder={placeholder}
      placeholderTextColor={theme.text}
      secureTextEntry={secureTextEntry === true}
      value={value}
      onChangeText={(text) => setter(text)}
    />
  );
}
