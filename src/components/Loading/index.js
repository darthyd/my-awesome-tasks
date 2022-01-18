/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import {
  View, StatusBar,
  ActivityIndicator
} from 'react-native';

import Context from '../../provider';

export default function Loading({ customTheme }) {
  const {
    theme
  } = useContext(Context);
  const colors = customTheme || theme;

  return (
    <>
      <View style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />

    </>
  );
}
