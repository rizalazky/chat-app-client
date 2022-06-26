const URL = 'http://localhost:8000/api/user';

const userApi = {
    addUser : (username,password)=>{
        return fetch(URL,{
            method : 'POST',
            mode : 'cors',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username,password})
        });
    }
}

export default userApi;