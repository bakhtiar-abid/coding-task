import React from 'react';
import Card from '../../Components/Card/Card';
import { Col } from 'react-bootstrap';
import useAuth from './../../hooks/useAuth';
import { useEffect, useState } from 'react';
import api from "../../hooks/useAxios";

const Client = () => {
    const {logout} = useAuth();
    
    const LogOut = () => {
       logout();
    };
    return (
       <div>
          <div>
             <div className="row" style={{ position: "relative" }}>
                <Col>
                   <div
                      className="mt-5 p-4"
                      style={{
                         backgroundColor: "#f8f9fa",
                      }}
                   >
                      <h1 size="md ">CLIENT PAGE</h1>
                   </div>
                </Col>
                <div
                   className="container py-3"
                   style={{
                      position: "absolute",
                      overflow: "hidden",
                      top: 55,
                      left: "1000px",
                   }}
                >
                   <button type="button" class="btn btn-dark" onClick={LogOut}>
                      Log out
                   </button>
                </div>
             </div>
          </div>

          <div className="mt-5">
             <Card></Card>
          </div>
       </div>
    );
};

export default Client;