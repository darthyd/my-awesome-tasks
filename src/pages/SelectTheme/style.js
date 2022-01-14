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
    fontSize: 32,
    color: theme.text,
    opacity: 1,
    textAlign: 'center',
  },
  saveButton: {
    width: '50%',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    borderRadius: 10,
  },
  saveButtonText: {
    color: theme.text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemTheme: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
});
