import React from "react";
import { Spinner } from "react-bootstrap";

import useAuth from "../../hooks/useAuth";
import {Navigate, useLocation } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
   const { user, isLoading } = useAuth();
    const location = useLocation();
   if (isLoading) {
      return (
         <div className="text-center">
            {" "}
            <Spinner animation="border" variant="danger" />
         </div>
      );
   }

    if (user){
        return children;
    }
   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
