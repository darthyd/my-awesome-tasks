import firebase from '../config/firebase';

export default function useFirebase() {
  const db = firebase.firestore();

  const deleteTask = (collection, id) => {
    db.collection(collection).doc(id).delete();
  }
  
  const addTask = (collection, data) => {
    return db.collection(collection).add(data);
  }

  const updateTask = (collection, id, data) => {
    return db.collection(collection).doc(id).update(data);
  }

  const setTask = (collection, id, data) => {
    return db.collection(collection).doc(id).update(data);
  }

  const findTask = (collection, id) => {
    return db.collection(collection).doc(id).get();
  }

  const findAllTasks = (collection) => {
    return db.collection(collection).get();
  }

  const registerUser = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  const authenticateUser = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  return { db, deleteTask, addTask, updateTask, setTask, findTask, findAllTasks, authenticateUser, registerUser };
}