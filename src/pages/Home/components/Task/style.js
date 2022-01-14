import { StyleSheet } from 'react-native';

export default (theme) => StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeTaskDescription: {
    flex: 1,
    textAlign: 'center',
    color: theme.text,
    fontSize: 18,
  },
  endedTaskDescription: {
    flex: 1,
    color: theme.text,
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationColor: theme.primary,
  },
  taskClickableArea: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    color: theme.text,
  },
  deleteTask: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
