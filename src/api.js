import firebase from 'firebase/app';
import 'firebase/auth';

const USERS = 'users';

export async function startListeningToLoggedInUserChanges(cb) {
  firebase.auth().onAuthStateChanged(async (userDoc) => {
    const user = userDoc ? await getUserByUID(userDoc.uid) : null;
    cb(user);
  });
}

function getUserByUID(uid) {
  return firebase
    .firestore()
    .collection(USERS)
    .doc(uid)
    .get()
    .then((user) => ({ ...user.data(), uid }));
}

export async function loginUser(email, password) {
  const userDoc = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return getUserByUID(userDoc.uid);
}

export function logoutUser() {
  return firebase.auth().signOut();
}
