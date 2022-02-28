import React, { createContext,useState,useContext,useEffect } from 'react';
import {auth} from '../../firebase';
import { getAuth, signOut } from "firebase/auth";
import {  onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";
import Login from '../Login';
import { ForkRightOutlined, Logout } from '@mui/icons-material';
const AuthContext=createContext();

export function useAuth(){
    return useContext(AuthContext); 

}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser]=useState({});
    // let currentUser={};

    const signup=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }

    function logout(){
        return signOut(auth);
    }

    function forgot(email){
        return sendPasswordResetEmail(auth,email);
    }

    useEffect(() => {
        const unsubscribe=onAuthStateChanged( auth,function (user){
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])
    
    const value={
        currentUser,
        signup,
        login,
        logout,
        forgot,
    }
    // console.log(value.currentUser.email,"valueee");

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}