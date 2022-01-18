import { StyleSheet, StatusBar } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight * 2,
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  mainText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.primary,
  },
  secondaryText: {
    color: theme.text,
    fontStyle: 'italic',
  },
});
