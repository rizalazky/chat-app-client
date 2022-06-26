import React, { useEffect, useState } from 'react'
import './Login.css';
import { userApi } from './api/index'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [alertMessage,setAlertMessage] = useState("");
    const navigate = useNavigate();
    
    const onSubmit =async (e)=>{
        e.preventDefault();
        const data ={
            username,
            password
        }
        let login = await (await userApi.login(username,password)).json();
        console.log(login)
        if(login.status == "NOT OKE"){
            setAlertMessage(login.message)
            console.log(alertMessage)
        }else{
            localStorage.setItem('user', JSON.stringify(login.data[0]));
            navigate('/')
        }
        

    }

    useEffect(()=>{
        let userData = localStorage.getItem('user');
        console.log(userData) 
       localStorage.removeItem('user');
    },[])

    return (
        <div className='login-wrapper'>
            <form onSubmit={onSubmit} className='login-form'>
                {
                    alertMessage !== '' &&
                    (
                        <div style={{backgroundColor :'red',textAlign:'center',borderRadius :'5px',marginBottom:'10px',padding:'10px'}}>
                            <span>{alertMessage}</span>
                        </div>
                    )
                    
                }
                <input type='text' placeholder='username' onInput={(e)=>setUsername(e.target.value)}/>
                <input type='password' placeholder='password' onInput={(e)=>setPassword(e.target.value)}/>
                <input type='submit' value='login'/>
            </form>
        </div>
    )
}

export default Login