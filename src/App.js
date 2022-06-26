import './App.css';
import Navbar from './componerts/Navbar';
import { Box } from '@mui/material';
import ListChat from './componerts/ListChat';
import ChatInput from './moleculs/ChatInput';
import Message from './moleculs/Message';
import {
  useNavigate,
} from "react-router-dom";
import { useEffect,useState } from 'react';
import { io } from 'socket.io-client'

const SERVER ="http://127.0.0.1:5000";
function App() {
  var socket = io(SERVER);
  const navigate = useNavigate();
  const [messageInput,setMessaggeInput] = useState("");
  const [messages,setMessages] = useState([]);
  const [dataUser,setDataUser] =useState()
  
  socket.on('chat message',(message)=>{
    setMessages([...messages,{textMessage : message.textMessage,from : message.from}])
  })

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
    }

    
  }, [])

  const handleChatInput =(msg)=>{
    setMessaggeInput(msg)
    console.log(msg)
  }

  const handleSendMessage =()=>{
    let dataToSendMessage ={
      textMessage : messageInput,
      from    : dataUser.username
    }
    console.log("Send Message =>",dataToSendMessage)

    socket.emit('chat message',dataToSendMessage)
    setMessaggeInput('')
  }
  
  return (
    <div className="App">
      <Navbar/>
      <Box display={'flex'} height={'100vh'} borderRight='1px solid white'>
          <Box bgcolor={'red'} width='15%'>
            <ListChat/>
          </Box>
          <Box  flexGrow={1} bgcolor='#0a1014'>
            {
              messages.map((dt,index)=>{
                return (
                  <Message isMe={dt.from == dataUser.username} key={index} textMessage={dt.textMessage} />
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
