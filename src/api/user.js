const URL = 'http://localhost:5000/api/user';

const userApi = {
    login : (username,password)=>{
        return fetch(URL+'/login',{
            method : 'POST',
            mode : 'cors',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username,password})
        });
    },
    register : (data) =>{
        return fetch(URL+'/register',{
            method : 'POST',
            mode : 'cors',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }); 
    }
}

export default userApi;