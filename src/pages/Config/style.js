import { StyleSheet, StatusBar } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight * 2,
    backgroundColor: theme.background,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.primary,
    marginVertical: 20,
  },
  secondaryText: {
    fontSize: 18,
    marginBottom: 10,
    color: theme.text,
    fontStyle: 'italic',
  },
  button: {
    width: '50%',
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    borderRadius: 10,
  },
  buttonText: {
    color: theme.text,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonLogout: {
    width: '50%',
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.danger,
    borderRadius: 10,
  },
  buttonTextLogout: {
    color: theme.text,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
