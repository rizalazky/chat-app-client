import './App.css';
import Navbar from './componerts/Navbar';
import { Box, Button } from '@mui/material';
import ListChat from './componerts/ListChat';
import ChatInput from './moleculs/ChatInput';
import Message from './moleculs/Message';
import {
  useNavigate,
} from "react-router-dom";
import { useEffect,useState } from 'react';
import { io } from 'socket.io-client'
import Icon from '@mui/material/Icon';
import { chatApi } from './api';

const SERVER ="http://127.0.0.1:5000";
function App() {
  var socket = io(SERVER);
  const navigate = useNavigate();
  const [listChat,setListChat] = useState([]);
  const [messageInput,setMessaggeInput] = useState("");
  const [messages,setMessages] = useState([]);
  const [dataUser,setDataUser] =useState()
  const [messsageTo,setMessageTo] = useState("");
  const [roomId,setRoomId] = useState()


  socket.on('chat message',(message)=>{
    getDataMessage()
    getDataChatRoom(dataUser.username)
    console.log("SOCKET ON CHAT MESSAGE",message)
  })

  const getDataMessage = async ()=>{
    let getApiDataMessage = await (await chatApi.getDataMessage(roomId)).json()
    console.log(getApiDataMessage)
    let dataMessage = getApiDataMessage.data;
    setMessages(dataMessage)
    //  set Message to 
    let users = roomId.split('_');
    setMessageTo(users[0] !== dataUser.username ? users[0] : users[1])
  }

  const getDataChatRoom = async (username)=>{
    console.log("USERBNAME",username)
    let data =await (await chatApi.getDataListChat(username)).json()
    if(data.status == "OKE"){
      let listChatArray =[]
      let dataList = data.data;
      dataList.map((dt)=>{
        let users = dt.users.split('_');
        listChatArray.push({
          username : users[0] !== username ? users[0] : users[1],
          roomId : dt.users
        })
      }) 
      setListChat(listChatArray);
      
    }
  }

  useEffect(()=>{
    getDataMessage()
  },[roomId])


  const handleSelectChatRoom = (roomId)=>{
    console.log("ROOM ID",roomId)
    setRoomId(roomId)
    
  }



  useEffect(() => {
    console.log(socket)
    socket.on('connect',()=>{
      console.log(socket.id)
    })
    let dataUserLocalStorage = JSON.parse(localStorage.getItem('user')) || false;

    if(!dataUserLocalStorage){
      navigate('/login')
    }else{
      setDataUser(dataUserLocalStorage)
      // getData Chat Room
      getDataChatRoom(dataUserLocalStorage.username)
    }
  }, [])

  const handleChatInput =(msg)=>{
    setMessaggeInput(msg)
    console.log(msg)
  }

  const handleSendMessage =()=>{
    let dataToSendMessage ={
      textMessage : messageInput,
      from    : dataUser.username,
      to      : messsageTo
    }
    console.log("Send Message =>",dataToSendMessage)

    socket.emit('chat message',dataToSendMessage)
    setMessaggeInput('')
  }

  const handleClickNewMessage =async ()=>{
    let username=window.prompt("username");
    if(username){
      let checkUser =  await (await chatApi.findUserToChat(username)).json();
      if(checkUser.status == "NOT OKE"){
        alert(checkUser.message)
        return false;
      }
      setMessageTo(username)
    }
  }
  
  return (
    <div className="App">
      <Navbar/>
      <Box display={'flex'} height={'100vh'} borderRight='1px solid white' bgcolor='#0a1014'>
          <Box bgcolor={'#0a1014'} width='15%'>
            <ListChat list={listChat} handleSelectChatRoom={handleSelectChatRoom}/>
            <Button sx={{ backgroundColor :'blue', position : 'sticky',bottom : 10,borderRadius : '5px'}} onClick={handleClickNewMessage}>+</Button>
          </Box>
          <Box  flexGrow={1} bgcolor='#0a1014'>
            {
              messages.map((dt,index)=>{
                return (
                  <Message isMe={dt.user == dataUser.username} key={index} textMessage={dt.text} />
                )
              })
            }
            <ChatInput handleChatInput={handleChatInput} chatInput={messageInput} hanldeSendMessage={handleSendMessage}/>
          </Box>
      </Box>
    </div>
  );
}

export default App;
