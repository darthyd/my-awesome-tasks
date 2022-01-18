import { StyleSheet, StatusBar } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 50,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100,
  },
  mainText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.primary,
  },
  subtitleText: {
    color: theme.text,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  secondaryText: {
    color: theme.text,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
  },
  link: {
    color: theme.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  notRegistered: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
});
