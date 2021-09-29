import firebase from "firebase";
import { appAuth } from "./firebase";
import { deleteData } from "../localstorage/localstorage";

export const signInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  appAuth.signInWithEmailAndPassword(email, password);

export const signOut = (): Promise<void> => {
  deleteData();
  return appAuth.signOut();
};

export const registerUser = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  appAuth.createUserWithEmailAndPassword(email, password);
