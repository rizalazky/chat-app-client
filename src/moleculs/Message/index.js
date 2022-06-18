import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function Message({isMe=false,textMessage}) {
 let bg ='#2a3942';
 let justifyContent ='flex-start'

 if(isMe){
    bg='#1976d2'
    justifyContent='flex-end'
 }
  return (
    <Box 
        // minHeight={'30px'} 
        maxWidth={'100%'}
        textAlign='left' 
        // padding={'10px'} 
        // borderRadius='5px' 
        margin='20px'
        display={'flex'}
        justifyContent={justifyContent}
        >
            <Box
                padding={'10px'} maxWidth={'80%'} sx={{ width :'fit-content'}}  borderRadius='5px' bgcolor={bg}
            >
                <Typography variant='body2'>{textMessage}</Typography>

            </Box>
    </Box>
  )
}

export default Message