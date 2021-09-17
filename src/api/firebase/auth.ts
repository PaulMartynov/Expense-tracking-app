import firebase from "firebase";
import { appAuth } from "./firebase";

export const signInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  appAuth.signInWithEmailAndPassword(email, password);

export const signOut = (): Promise<void> => appAuth.signOut();

export const registerUser = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  appAuth.createUserWithEmailAndPassword(email, password);
