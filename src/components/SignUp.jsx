import React,{useState,useRef} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import{NavLink,Navigate} from 'react-router-dom';
import {useAuth} from './contexts/AuthContext';
import InputAdornments from './InputAdornments'
import "./SignUp.css";

export default function SignUp(){
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const {signup,currentUser}=useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const showPassword=useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        if(passwordConfirmRef.current.value!==passwordRef.current.value)
        {
            return  setError('Passwords do not match !');
        }
        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value,passwordRef.current.value);
        }
        catch{
            setError('Failed to create an account')
        }
        setLoading(false);

    }

    if(!currentUser)
    return (
        <div className="container">
        <div className="card">
            <h1>
                Sign Up
            </h1>
            <p>
                {currentUser&&currentUser.email}
            </p>
            {error&& <div style={{marginBottom:"20px", color:"rgb(138, 0, 0)",textAlign:"center",backgroundColor: "rgb(248, 213, 213)",padding:"10px", borderRadius:"5px",border:"2px solid rgb(255, 183, 183)",}}>{error}</div>}
            <form action="" onSubmit={handleSubmit}>
            <TextField  className="input" type="email" id="outlined-basic" label="Email or Phone" variant="outlined" inputRef={emailRef} required={true}/>
            <InputAdornments Refv={passwordRef} label="Password"></InputAdornments>
            <InputAdornments Refv={passwordConfirmRef} label="Confirm Password"></InputAdornments>
            <Button disabled={loading} variant="contained" className="btn" type="Submit">Sign Up</Button>
            <br />
            <div >
                Already have an account? 
            <NavLink to="/login" element="" className="sign-in"> Sign in</NavLink>
            </div>
            </form>
        </div>
        </div>
    )
    else return <Navigate to="/" /> 
}