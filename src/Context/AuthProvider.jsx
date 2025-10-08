import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../Pages/Firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);

  const signWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoading(false);
        setUser(currentUser);
      } else {
        setLoading(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const AuthData = { 
    user,
    setUser,
    loading,
    setLoading,
    signWithGoogle,
    logOutUser
   };


  return (
    <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
