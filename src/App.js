import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Header from './Layouts/Navbar/Header';
import Test from './Layouts/Navbar/Test';
import Login from './Login/Login';
import Client from './Pages/Client/Client';
import useAuth from './hooks/useAuth';
import Register from './Login/Register';
import Home from './Pages/Home/Home';
import Admin from './Pages/Admin/Admin';



function App() {
   // const { user, admin, editor, logout } = useAuth();
  return (
     <>
        <AuthProvider>
           <Router>
              <Routes>
                 <Route path="/" element={<Login></Login>}></Route>
               <Route path="/home" element={<Home></Home>} ></Route>
                 <Route
                    path="/register"
                    element={<Register></Register>}
                 ></Route>
                 <Route path="/client" element={<Client />}></Route>
                 <Route path = "/admin" element={<Admin/>} ></Route>
              </Routes>
           </Router>
        </AuthProvider>
     </>
  );
}

export default App;
