import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Header from './Layouts/Navbar/Header';
import Test from './Layouts/Navbar/Test';
import Login from './Login/Login';


function App() {
  return (
     <>
        <AuthProvider>
           <Router>
              <Routes>
                 {/* <PrivateRoute path="/dashboard">
                    <Dashboard />
                 </PrivateRoute> */}
                 {/* <Route
                    path="/*"
                    element={<Navigate to="/login"></Navigate>}
                 ></Route> */}
                 <Route path="/navbar" element={<Header />}></Route>
                 <Route path="/" element={<Login></Login>}></Route>
              </Routes>
              {/* <Footer></Footer> */}
           </Router>
        </AuthProvider>
     </>
  );
}

export default App;
