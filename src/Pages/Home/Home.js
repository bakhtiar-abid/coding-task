import React from 'react';
import Admin from '../Admin/Admin';
import Client from '../Client/Client';
import useAuth from './../../hooks/useAuth';
import Login from './../../Login/Login';

const Home = () => {
     const { user, admin, editor, logout } = useAuth();
    return (
        
        user.email && !admin ? (<Client></Client>) : admin ? (<Admin/>) : <Login></Login>
        
        
            
        
    );
};

export default Home;