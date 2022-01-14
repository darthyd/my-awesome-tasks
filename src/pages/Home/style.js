import { StyleSheet, StatusBar } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: StatusBar.currentHeight * 2,
  },
  floatButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  floatButtonText: {
    color: theme.text,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  mainText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.primary,
    textAlign: 'center',
    marginVertical: 20,
  },
  primaryText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 40,
    color: theme.text,
  },
  secondaryText: {
    textAlign: 'center',
    fontSize: 16,
    color: theme.text,
  },
});
