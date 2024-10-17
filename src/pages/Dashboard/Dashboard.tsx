import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, List } from '@mui/material';

import { useAuthStore } from '../../store/authStore.ts';
import { UserListItem, ResizableSidebar, MessageItem } from '../../components';

const Dashboard = () => {
  const navigate = useNavigate();
  const logOut = useAuthStore((store) => store.logOut);
  const user = useAuthStore((store) => store.user);

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          backgroundColor: '#f5f5f5',
        }}
      >
        <ResizableSidebar>
          <Box mb={4}>
            <Typography
              variant='h5'
              fontWeight='bold'
              gutterBottom
              color='primary'
            >
              Chats
            </Typography>
            <List>
              <UserListItem
                title='Name Surname'
                text='Hello world'
                date='Date'
                status='active'
                isSelected
              />
              <UserListItem
                title='Name Surname'
                text='Hello world'
                date=''
                status='offline'
              />
              <UserListItem
                title='Name Surname'
                text='Hello world'
                date=''
                status='active'
              />
            </List>
          </Box>
          <Box>
            <Typography
              variant='h5'
              fontWeight='bold'
              gutterBottom
              color='primary'
            >
              Contacts
            </Typography>
            <List>
              <UserListItem
                title='Name Surname'
                text='Hello world'
                date=''
                status='busy'
              />
              <UserListItem
                title='Name Surname'
                text='Hello world'
                date=''
                status='active'
              />
            </List>
          </Box>
        </ResizableSidebar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            p: 2,
            maxWidth: '800px',
            marginX: 'auto',
          }}
        >
          <MessageItem isOutgoing={false} text='loremlorem' timestamp='12:23' />
          <MessageItem
            isOutgoing={true}
            text='loremlorem loremlorem loremlo remlo remloreml oremlore loremlo remlor emloreml orem'
          />
          <MessageItem
            isOutgoing={true}
            text='loremlorem loremlorem loremlo remlo remloreml oremlore loremlo remlor emloreml orem'
            timestamp='12:23'
          />
        </Box>
      </Box>

      <Button variant='contained' onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
