import React,{useState,useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import{NavLink,useNavigate } from 'react-router-dom';
import {useAuth} from './contexts/AuthContext';
import InputAdornments from './InputAdornments'
import "./SignUp.css";

export default function Login(){
  const navigate=useNavigate();
    const emailRef=useRef();
    const passwordRef=useRef();
    const {currentUser,login}=useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            const error=await login(emailRef.current.value,passwordRef.current.value);
            navigate("/")
        }
        catch{
            setError('Incorrect Password or Email')
        }
        setLoading(false);

    }
    return (
        <div className="container">
        <div className="card">
            <h1>
                Log In
            </h1>
           {error&& <div style={{marginBottom:"20px", color:"rgb(138, 0, 0)",textAlign:"center",backgroundColor: "rgb(248, 213, 213)",padding:"10px", borderRadius:"5px",border:"2px solid rgb(255, 183, 183)",}}>{error}</div>}
            <form action="" onSubmit={handleSubmit}>
            <TextField  className="input" type="email" id="outlined-basic" label="Email or Phone" variant="outlined" inputRef={emailRef} required={true}/>
            <InputAdornments Refv={passwordRef} label="Password"></InputAdornments>
            <br />
            <Button disabled={loading} variant="contained" className="btn" type="Submit">Log In</Button>
            <p className="forgot"><NavLink to="/forgot_password" element="" className="sign-in">Forgot Password?</NavLink></p>
            <div >
                <br /><br />
                Don't have an account? 
            <NavLink to="/signup" element="" className="sign-in"> SignUp</NavLink>
            </div>
            </form>
        </div>
        </div>
    )
}