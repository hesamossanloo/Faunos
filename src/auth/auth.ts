// src/auth/auth.ts

import { auth } from "@/services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

export const signUp = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logIn = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
