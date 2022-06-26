import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

export default function ListChat({list,handleSelectChatRoom}) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index,roomId) => {
    setSelectedIndex(index);
    handleSelectChatRoom(roomId);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#0a1014',height:'100%',color:'whitesmoke',borderRight:'1px solid #a9b5bc',borderColor:'#a9b5bc' }} >
      <List component="nav" aria-label="main mailbox folders">
        {
          list.map((dt,index)=>{
            return (
              <ListItemButton
                key={index}
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0,dt.roomId)}
              >
                <ListItemIcon>
                  <InboxIcon htmlColor='white'/>
                </ListItemIcon>
                <ListItemText primary={dt.username} />
              </ListItemButton>
            )
          })
        }
        
      </List>
      <Divider />
    </Box>
  );
}
