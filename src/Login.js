import React, { useState } from 'react'
import './Login.css';
import { userApi } from './api/index'

function Login() {
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    
    const onSubmit =async (e)=>{
        e.preventDefault();
        const data ={
            username,
            password
        }
        let getData = userApi.addUser(username,password).then(response => {return response.json()}).then(res =>console.log(res));
        // localStorage.setItem('user', JSON.stringify(data));
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