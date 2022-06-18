import logo from './logo.svg';
import './App.css';
import { Container } from '@mui/system';
import Navbar from './componerts/Navbar';
import { Box } from '@mui/material';
import ListChat from './componerts/ListChat';
import ChatInput from './moleculs/ChatInput';
import Message from './moleculs/Message';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from 'react';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    
    let dataUser = JSON.parse(localStorage.getItem('user')) || false;

    if(!dataUser){
      navigate('/login')
    }
    
  }, [])
  
  return (
    <div class="App">
      <Navbar/>
      <Box display={'flex'} height={'100vh'} borderRight='1px solid white'>
          <Box bgcolor={'red'} width='15%'>
            <ListChat/>
          </Box>
          <Box  flexGrow={1} bgcolor='#0a1014'>
            <Message textMessage={'Halo Apakabar ?'}/>
            <Message isMe textMessage={'Baik,Kamu gimana?'}/>
            <ChatInput/>
          </Box>
      </Box>
    </div>
  );
}

export default App;
