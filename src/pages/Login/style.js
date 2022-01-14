import { StyleSheet, StatusBar } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
  },
  secondaryText: {
    color: theme.text,
    fontSize: 18,
  },
  input: {
    width: '80%',
    height: 50,
    fontSize: 18,
    paddingLeft: 10,
    color: theme.text,
    borderBottomWidth: 1,
    borderColor: theme.primary,
    marginTop: 20,
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
