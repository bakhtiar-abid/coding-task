import React, { useState } from 'react';
import "./Login.css"


import {
   getAuth,
   updateProfile,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   sendEmailVerification,
   sendPasswordResetEmail,
} from "firebase/auth";
import initializeAuthentication from "./Firebase/firebase.init";
import useAuth from './../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

initializeAuthentication();

const Login = () => {
       const [name, setName] = useState("");
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [error, setError] = useState("");
       const { signInUsingGoogle } = useAuth();
       const [isLogin, setIsLogin] = useState(false);
       const auth = getAuth();
       const location = useLocation();
       const history = useNavigate();
       const redirect_uri = location.state?.from || "./navbar";

       const handleGoogleLogin = () => {
          signInUsingGoogle().then((result) => {
             history(redirect_uri);
             const user = result.user;
             console.log(user);
          });
       };
       const toggleLogin = (e) => {
          setIsLogin(e.target.checked);
       };

       const hanldeNameChange = (e) => {
          setName(e.target.value);
       };

       const handleEmailChange = (e) => {
          setEmail(e.target.value);
       };

       const hanldePasswordChange = (e) => {
          setPassword(e.target.value);
       };

       const handleRegistration = (e) => {
          e.preventDefault();
          console.log(email, password);
          if (password.length < 6) {
             setError("Password Must be at least 6 characters long.");
             return;
          }
          if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
             setError("Password Must Contain two upperCase");
             return;
          }
          isLogin
             ? processLogin(email, password)
             : createNewUser(email, password);
       };

       const processLogin = (email, password) => {
          signInWithEmailAndPassword(auth, email, password)
             .then((result) => {
                const user = result.user;
                console.log(user);
                setError("");
                history(redirect_uri);
             })
             .catch((error) => {
                setError(error.message);
             });
       };

       const createNewUser = (email, password) => {
          createUserWithEmailAndPassword(auth, email, password)
             .then((result) => {
                const user = result.user;
                console.log(user);
                setError("");
                verifyEmail();
                setUserName();
                history.push(redirect_uri);
             })
             .catch((error) => {
                setError(error.message);
             });
       };
       const setUserName = () => {
          updateProfile(auth.currentUser, {
             displayName: name,
             photoURL: "https://example.com/jane-q-user/profile.jpg",
          }).then(() => {
             // Profile updated!
             // ...
          });
       };
       const verifyEmail = () => {
          sendEmailVerification(auth.currentUser).then((result) => {
             console.log(result);
          });
       };

       const handleResetPassword = () => {
          sendPasswordResetEmail(auth, email)
             .then((result) => {
                // Password reset email sent!
                // ..
             })
             .catch((error) => {
                setError(error.message);
                // ..
             });
       };

    return (
       <div className="bg-image">
          <div className="container overflow-hidden">
             <div className="my-5 mx-5 ">
                <form onSubmit={handleRegistration}>
                   <h3 className="text-success ">
                      Please {isLogin ? "Login" : "Register"}{" "}
                   </h3>
                   {!isLogin && (
                      <div className="row mb-3">
                         <label
                            for="inputAddress"
                            className="col-sm-2 col-form-label "
                         >
                            Name:
                         </label>
                         <div className="col-sm-10 overflow-hidden">
                            <input
                               onBlur={hanldeNameChange}
                               type="text"
                               className="form-control w-50"
                               id="inputAddress"
                               placeholder="Your Name"
                            />
                         </div>

                         <br />
                      </div>
                   )}
                   <div className="row mb-3">
                      <label
                         htmlFor="inputEmail3"
                         className="col-sm-2 col-form-label "
                      >
                         Email:
                      </label>
                      <div className="col-sm-10">
                         <input
                            onBlur={handleEmailChange}
                            type="email"
                            className="form-control  w-50"
                            id="inputEmail3"
                            required
                            placeholder="Your Email"
                         />
                      </div>
                   </div>
                   <div className="row mb-3">
                      <label
                         htmlFor="inputPassword3"
                         className="col-sm-2 col-form-label"
                      >
                         Password:
                      </label>
                      <div className="col-sm-10">
                         <input
                            onBlur={hanldePasswordChange}
                            type="password"
                            className="form-control  w-50"
                            id="inputPassword3"
                            placeholder="password"
                            required
                         />
                      </div>
                   </div>

                   <div className="row mb-3">
                      <div className="col-sm-10 offset-sm-2">
                         <div className="form-check">
                            <input
                               onChange={toggleLogin}
                               className="form-check-input"
                               type="checkbox"
                               id="gridCheck1"
                            />
                            <label
                               className="form-check-label"
                               htmlFor="gridCheck1"
                            >
                               Already Registered?
                            </label>
                         </div>
                      </div>
                   </div>
                   <div className="row- mb-3 text-danger"> {error} </div>
                   <button type="submit" className="btn btn-success">
                      {isLogin ? "Login" : "Register"}
                   </button>
                   <button
                      type="button"
                      onClick={handleResetPassword}
                      class="btn btn-secondary btn-sm ms-3 "
                   >
                      Reset Password
                   </button>
                </form>
                <br />
                <p>Sign-In Using Google</p>
                <button className="btn btn-warning" onClick={handleGoogleLogin}>
                   {" "}
                   <i class="fab fa-google"></i> Google Sign-In{" "}
                </button>
             </div>
          </div>
       </div>
    );
};

export default Login;