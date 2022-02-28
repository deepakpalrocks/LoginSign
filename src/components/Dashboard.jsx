import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useAuth } from './contexts/AuthContext';
import {NavLink,useNavigate,Navigate} from 'react-router-dom'
import "./Dashboard.css"

export default function Dashboard() {
  const [error,setError]=useState('')
  const {currentUser,logout}=useAuth();
  const navigate= useNavigate();
  async function handleLogout(){
    setError('');

    try{
      await logout();
      navigate('/login')
    }
    catch{
      setError('Failed to Log Out')
    }
  }
  if(currentUser)
  return (
    <div className="container">
      <div className="dashcard">
        <h1>Profile</h1>
        <b>Email: </b> {currentUser&&currentUser.email}
        <br />
        <br />
        <br />
        <NavLink to="/update_profile" element="" className="sign-in">
          <Button className="btn" variant="contained">Update Profile</Button>
        </NavLink>
      </div>
      <div>
        <button className="logout" onClick={handleLogout}> Logout</button> 
      </div>
    </div>
  );
  else
  return <Navigate to="/login" />;
}
