import firebase from '../config/firebase';

export default function useFirebase() {
  const auth = firebase.auth();
  const db = firebase.firestore();

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

  const getAllTasks = async (collection) => {
    return db.collection(collection).get()
      .then((tasks) => tasks.docs)
      .then((tasks) => tasks.filter((task) => task.id.includes('task')))
      .then((docs) => docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      .catch((error) => error);
  };

  const newDocToDB = async (collection, id, task) => {
    return db.collection(collection).doc(id).set(task)
      .then((doc) => doc)
      .catch((error) => error);
  };

  return {
    authenticateUser,
    registerUser,
    getAllTasks,
    newDocToDB
  };
}
