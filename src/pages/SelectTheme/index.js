import React, { useContext, useEffect, useState } from 'react';
import {
  Text, FlatList, SafeAreaView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons';

import useNewTheme from '../../hooks/useNewTheme';
import Context from '../../context/index';
import themes from '../../config/themes';
import stylesheet from './style';

import { capitalize } from '../../utils/misc';

export default function SelectedTheme() {
  const [selectedTheme, setSelectedTheme] = useState('');
  const { theme } = useContext(Context);
  const setNewTheme = useNewTheme();
  const styles = stylesheet(theme);

  useEffect(() => {
    AsyncStorage.getItem('@theme').then((t) => {
      if (t !== null) {
        setSelectedTheme(t);
      }
    });
  }, []);

  const itemList = (data) => {
    const { index } = data;
    const name = Object.keys(themes)[data.index];
    return (
      <TouchableOpacity
        style={styles.itemTheme}
        key={name + index}
        onPress={() => { setSelectedTheme(name); }}
      >
        {selectedTheme === name ? (
          <FontAwesome
            name="check"
            size={38}
            color={theme.danger}
            style={styles.icon}
          />
        ) : null}
        <Text style={styles.secondaryText}>{capitalize(name)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Selecione o tema</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.values(themes)}
        keyExtractor={(item) => item.background + item.primary}
        renderItem={(item) => itemList(item)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={() => setNewTheme(selectedTheme)}>
        <Text style={styles.saveButtonText}>Aplicar Tema</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
