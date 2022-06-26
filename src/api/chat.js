const URL = 'http://localhost:5000/api/chat';

const chatApi = {
    findUserToChat : (username)=>{
        return fetch(URL+'/'+username,{
            method : 'GET',
            mode : 'cors',
            headers :{
                'Content-Type' : 'application/json'
            },
        });
    },
    getDataListChat : (username)=>{
         return fetch(URL+'/getlistchatroom/'+username,{
            method : 'GET',
            mode : 'cors',
            headers :{
                'Content-Type' : 'application/json'
            },
        });
    },
    getDataMessage : (roomID)=>{
        return fetch(URL+'/getdatamessage/'+roomID,{
            method : 'GET',
            mode : 'cors',
            headers :{
                'Content-Type' : 'application/json'
            },
        });
    }
}

export default chatApi;