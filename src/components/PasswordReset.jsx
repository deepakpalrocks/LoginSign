import React,{useState,useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import{NavLink,useNavigate } from 'react-router-dom';
import {useAuth} from './contexts/AuthContext';
import "./SignUp.css";

export default function PasswordReset(){
  const navigate=useNavigate();
    const emailRef=useRef();
    const {forgot}=useAuth();
    const [error,setError]=useState('');
    const [message,setMessage]=useState('');
    const [loading,setLoading]=useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            await forgot(emailRef.current.value);
            setMessage('Reset Link sent,Check your Email');
        }
        catch{
            setMessage('');
            setError('Failed to send reset link, check your email')
        }
        setLoading(false);

    }
    return (
        <div className="container">
        <div className="card">
            <h1>
                Reset Password
            </h1>
            {message&& <div style={{marginBottom:"20px", color:"rgb(0, 138, 0)",textAlign:"center",backgroundColor: "rgb(213, 248, 213)",padding:"10px", borderRadius:"5px",border:"2px solid rgb(183, 255, 183)",}}>{message}</div>}
           {error&& <div style={{marginBottom:"20px", color:"rgb(138, 0, 0)",textAlign:"center",backgroundColor: "rgb(248, 213, 213)",padding:"10px", borderRadius:"5px",border:"2px solid rgb(255, 183, 183)",}}>{error}</div>}
            <form action="" onSubmit={handleSubmit}>
            <TextField  className="input" type="email" id="outlined-basic" label="Email or Phone" variant="outlined" inputRef={emailRef} required={true}/>
            <br />
            <Button disabled={loading} variant="contained" className="btn" type="Submit">Send Reset Link</Button>
            <p className="forgot"><NavLink to="/login" element="" className="sign-in"> Sign In?</NavLink></p>
            </form>
        </div>
        </div>
    )
}