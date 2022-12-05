import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   signOut,
   onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import initializeAuthentication from "../Login/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
   const [user, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   const auth = getAuth();
   const signInUsingGoogle = () => {
      setIsLoading(true);
      const googleProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleProvider).finally(() =>
         setIsLoading(false)
      );
   };
//    const signInUsingGoogle = () => {

//       signInWithPopup(auth, googleProvider)
//          .then((result) => {
//             setUser(result.user);
//          })
//          .finally(() => setIsLoading(false));
//    };

   // observe user state change
   useEffect(() => {
      const unsubscribed = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUser(user);
         } else {
            setUser({});
         }
         setIsLoading(false);
      });
      return () => unsubscribed;
   }, []);
   // return signInWithPopup(auth, googleProvider).finally(() =>
   //          setIsLoading(false)

   const logOut = () => {
      setIsLoading(true);
      signOut(auth)
         .then(() => {})
         .finally(() => setIsLoading(false));
   };

   return {
      user,
      isLoading,
      signInUsingGoogle,
      logOut,
   };
};

export default useFirebase;
