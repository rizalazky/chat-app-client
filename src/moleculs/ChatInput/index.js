import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function ChatInput({chatInput,handleChatInput,hanldeSendMessage}) {
  return (
    <Box
      component="form"
      width={'95%'}
      display={'flex'}
      noValidate
      autoComplete="off"
      position={'fixed'}
      bottom={10}
      
    >
      <Box width={'80%'} color='white' bgcolor={'#2a3942'}>
        <TextField id="outlined-basic" label="Type Message" sx={{ height : '100%',width:'100%',color:'white',colorScheme :'light'}} variant="outlined"  multiline onChange={(e)=>handleChatInput(e.target.value)} value={chatInput}/>
      </Box>
      <Box marginLeft={2}>
        <Button variant="contained" endIcon={<SendIcon />} onClick ={hanldeSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default ChatInput