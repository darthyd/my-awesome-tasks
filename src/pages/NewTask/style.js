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
  saveButton: {
    width: '50%',
    height: 50,
    marginTop: 20,
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
});
