import firebase from '../config/firebase';

export default function useFirebase() {
  const db = firebase.firestore();
  const auth = firebase.auth();

  const deleteTask = (collection, id) => {
    db.collection(collection).doc(id).delete();
  }
  
  const addTask = async (collection, data) => {
    return await db.collection(collection).add(data).then((e) => e.id);
  }

  const updateTask = async (collection, id, data) => {
    return db.collection(collection).doc(id).update(data);
  }

  const findTask = (collection, id) => {
    return db.collection(collection).doc(id).get();
  }

  const findAllTasks = (collection) => {
    return db.collection(collection).get();
  }

  const registerUser = async (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
    .then(userCredentials => userCredentials)
    .catch(error => error);
  }

  const authenticateUser = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
    .then(userCredentials => userCredentials)
    .catch(error => error);
  }

  // find a task by an value
  const findTaskByValue = (collection, key) => {
    return db.collection(collection).where(key, '==', id).get();
  }

  return { db, deleteTask, addTask, updateTask, findTaskByValue, findTask, findAllTasks, authenticateUser, registerUser };
}