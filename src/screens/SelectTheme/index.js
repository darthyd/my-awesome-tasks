import React, { useContext, useState, useEffect } from 'react';
import {
  Text, FlatList, SafeAreaView, TouchableOpacity, BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons';
import Context from '../../provider';
import themes from '../../configs/themes';
import stylesheet from './style';

import { capitalize } from '../../utils/misc';
import { db } from '../../configs/firebase';

export default function SelectedTheme({ navigation }) {
  const { theme, setTheme, user } = useContext(Context);
  const [applied, setApplied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(theme.name);
  const styles = stylesheet(themes[selectedTheme]);

  const handleTheme = () => {
    if (selectedTheme !== theme.name) {
      setTheme({ ...themes[selectedTheme], name: selectedTheme });
      AsyncStorage.setItem('@theme', selectedTheme);
      db.collection(user.uid).doc('config').update({ theme: selectedTheme });
    } else {
      navigation.goBack();
    }
    setApplied(true);
  };

  useEffect(() => {
    if (applied && selectedTheme === theme.name) {
      setApplied(false);
      navigation.goBack();
    }
  }, [theme]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => navigation.goBack());
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

  if (selectedTheme === '') return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Selecione o tema</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.values(themes)}
        keyExtractor={(item) => item.background + item.primary}
        renderItem={(item) => itemList(item)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleTheme}>
        <Text style={styles.saveButtonText}>Aplicar Tema</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
