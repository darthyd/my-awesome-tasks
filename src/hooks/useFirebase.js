import firebase from '../config/firebase';

export default function useFirebase() {
  const db = firebase.firestore();
  const auth = firebase.auth();

  const deleteTask = (collection, id) => {
    db.collection(collection).doc(id).delete();
  };

  const addTask = async (collection, data) => {
    return db.collection(collection).add(data).then((e) => e.id);
  };

  const setNewDocument = async (collection, doc, data) => {
    return db.collection(collection).doc(doc).set(data);
  };

  const updateTask = async (collection, id, data) => {
    return db.collection(collection).doc(id).update(data);
  };

  const findTask = (collection, id) => {
    return db.collection(collection).doc(id).get();
  };

  const findAllTasks = async (collection) => {
    const snapshot = await db.collection(collection).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const registerUser = async (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => userCredentials)
      .catch((error) => error);
  };

  const authenticateUser = async (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
      .then((userCredentials) => userCredentials)
      .catch((error) => error);
  };

  return {
    db,
    deleteTask,
    setNewDocument,
    addTask,
    updateTask,
    findTask,
    findAllTasks,
    authenticateUser,
    registerUser
  };
}
