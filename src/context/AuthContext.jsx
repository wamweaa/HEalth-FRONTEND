// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from './firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // User signup with email/password
  const signup = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Email/password login
  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in
  const googleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    try {
      setError('');
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError('');
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleSignIn,
    resetPassword,
    logout,
    error,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}