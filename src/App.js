import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Header from './Layouts/Navbar/Header';
import Test from './Layouts/Navbar/Test';


function App() {
  return (
     <>
        {/* <AuthProvider>
       
        </AuthProvider> */}
        <Router>
           <Routes>
              {/* <PrivateRoute path="/dashboard">
                    <Dashboard />
                 </PrivateRoute> */}
              <Route
                 path="/*"
                 element={<Navigate to="/navbar"></Navigate>}
              ></Route>
              <Route path="/navbar" element={<Header />}></Route>
              <Route path="/test" element={<Test />}></Route>
           </Routes>
           {/* <Footer></Footer> */}
        </Router>
     </>
  );
}

export default App;
