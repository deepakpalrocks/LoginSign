import React,{useState,useRef} from 'react';
import SignUp from "./SignUp"
import {AuthProvider} from './contexts/AuthContext'
import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import PasswordReset from './PasswordReset';

const App=()=>{

    return (
        <AuthProvider>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/forgot_password" element={<PasswordReset />}/>
            </Routes>
        </AuthProvider>
    )
}

export default App;