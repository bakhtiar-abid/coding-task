import {
   createUserWithEmailAndPassword,
   getAuth,
   getIdToken,
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "./../Login/Firebase/firebase.init";
import { useLocation } from 'react-router-dom';

// initialize firebase app
initializeFirebase();

const useFirebase = () => {
   const [user, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [authError, setAuthError] = useState("");
   const [admin, setAdmin] = useState(false);
   const [editor, setEditor] = useState(false);
   console.log("editor", editor);
   const [token, setToken] = useState("");
   const auth = getAuth();
 
   const googleProvider = new GoogleAuthProvider();
   

   const registerUser = (email, password, name, history) => {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            setAuthError("");
            const newUser = { email, displayName: name };
            setUser(newUser);
            // save user to the database
            saveUser(email, name, "PUT");
            // send name to firebase after creation
            updateProfile(auth.currentUser, {
               displayName: name,
            })
               .then(() => {})
               .catch((error) => {});
            history("/");
         })
         .catch((error) => {
            setAuthError(error.message);
            console.log(error);
         })
         .finally(() => setIsLoading(false));
   };

   const loginUser = (email, password, location, history) => {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const destination = location?.state?.from || "/home";
            history(destination);
            setAuthError("");
         })
         .catch((error) => {
            setAuthError(error.message);
         })
         .finally(() => setIsLoading(false));
   };

   const signInWithGoogle = (location, history) => {
      setIsLoading(true);
      signInWithPopup(auth, googleProvider)
         .then((result) => {
            const user = result.user;
            saveUser(user?.email, user?.displayName, "PUT");
            setAuthError("");
            const destination = location?.state?.from || "/";
            history(destination);
         })
         .catch((error) => {
            setAuthError(error.message);
         })
         .finally(() => setIsLoading(false));
   };

   // observer user state
   useEffect(() => {
      const unsubscribed = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user);
            getIdToken(user).then((idToken) => {
               setToken(idToken);
            });
         } else {
            setUser({});
         }
         setIsLoading(false);
      });
      return () => unsubscribed;
   }, [auth]);

   useEffect(() => {
      fetch(
         `https://dashboard-ecommerce-backend.vercel.app/users/${user.email}`
      )
         .then((res) => res.json())
         .then((data) => setAdmin(data.admin));
   }, [user.email]);

   //    useEffect(() => {
   //       fetch(
   //          `https://dashboard-ecommerce-backend.vercel.app/editor/${user.email}`
   //       )
   //          .then((res) => res.json())
   //          .then((data) => setEditor(data.editor));
   //    }, [user.email]);

   const logout = () => {
      setIsLoading(true);
      signOut(auth)
         .then(() => {
            // Sign-out successful.
            
         })
         .catch((error) => {
            // An error happened.
         })
         .finally(() => setIsLoading(false));
   };

   const saveUser = (email, displayName, method) => {
      const user = { email, displayName };
      fetch("https://dashboard-ecommerce-backend.vercel.app/users", {
         method: method,
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(user),
      }).then();
   };

   return {
      user,
      admin,
      editor,
      token,
      isLoading,
      authError,
      registerUser,
      loginUser,
      signInWithGoogle,
      logout,
   };
};

export default useFirebase;
