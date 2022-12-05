import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Header from './Layouts/Navbar/Header';
import Test from './Layouts/Navbar/Test';
import Login from './Login/Login';
import Client from './Pages/Client/Client';



function App() {
  return (
     <>
        <AuthProvider>
           <Router>
              <Routes>
                 <Route
                    path="/navbar"
                    element={<Header />}
                 ></Route>
                
                 <Route path="/" element={<Login></Login>}></Route>
                 <Route path='/client' element={<Client/>} ></Route>
              </Routes>
           
           </Router>
        </AuthProvider>
     </>
  );
}

export default App;
