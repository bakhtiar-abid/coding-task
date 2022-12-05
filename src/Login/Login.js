import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useState } from "react";

import "./Login.css";
import useAuth from './../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
   const location = useLocation();
   const [loginData, setLoginData] = useState({});
   console.log(loginData);
   const history = useNavigate();
   const { signInWithGoogle, loginUser, authError } = useAuth();

   const handleGoogleSignIn = () => {
      signInWithGoogle(location, history);
   };
   const handleLoginSubmit = (e) => {
      loginUser(loginData.email, loginData.password, location, history);
      e.preventDefault();
   };

   const handleOnChange = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      const newLoginData = { ...loginData };
      newLoginData[field] = value;
      setLoginData(newLoginData);
   };
   return (
      <>
         <div className="bg-image">
            <div className="login-form d-flex justify-content-center align-items-center">
               <Container className="login">
                  <Row>
                     <Col
                        className="login-form-right text-center px-4 pt-5"
                        md={7}
                     >
                        <h4 className="fw-bold">Login to your account</h4>
                        <p>
                           Don’t have an account?{" "}
                           <Link to={"/register"}>
                              <button className="border-0 bg-transparent signup-toggle-btn">
                                 <small>Sign Up Free!</small>
                              </button>
                           </Link>
                        </p>

                        <form onSubmit={handleLoginSubmit}>
                           <input
                              className="w-100 py-2 ps-3 user-input"
                              placeholder="Email"
                              name="email"
                              onChange={handleOnChange}
                              required
                           />
                           <br />

                           <input
                              className="w-100 py-2 ps-3 mt-4 user-input"
                              placeholder="Password"
                              type="password"
                              name="password"
                              onChange={handleOnChange}
                              required
                           />

                           <br />
                           <div className="text-end pt-3">
                              <div typ className="border-0 bg-transparent forgot-btn cursor-pointer">
                                 Forgot Password?
                              </div>
                              {authError ? (
                                 <div>
                                    <small className="text-danger">
                                       {authError}
                                    </small>
                                 </div>
                              ) : (
                                 ""
                              )}
                           </div>
                           <button class="btn btn-success">
                              Login
                           </button>
                        </form>
                     </Col>
                  </Row>
               </Container>
            </div>
         </div>
      </>
   );
};

export default Login;
