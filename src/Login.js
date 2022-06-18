import React, { useState } from 'react'
import './Login.css';

function Login() {
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    
    const onSubmit =(e)=>{
        e.preventDefault();
        const data ={
            username,
            password
        }

        localStorage.setItem('user', JSON.stringify(data));
    }

    return (
        <div className='login-wrapper'>
            <form onSubmit={onSubmit} className='login-form'>
                <input type='text' placeholder='username' onInput={(e)=>setUsername(e.target.value)}/>
                <input type='password' placeholder='password' onInput={(e)=>setPassword(e.target.value)}/>
                <input type='submit' value='login'/>
            </form>
        </div>
    )
}

export default Login