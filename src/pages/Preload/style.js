import { StyleSheet, StatusBar } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.primary,
  },
  icon: {
    width: 100,
    height: 100,
  }
});
