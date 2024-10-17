import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, List } from '@mui/material';

import { useAuthStore } from '../../store/authStore.ts';
import { Api } from '../../server';
import { UserListItem, ResizableSidebar, MessageItem } from '../../components';
import { Chat, Contact } from '../../server/types.ts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  const logOut = useAuthStore((store) => store.logOut);
  const user = useAuthStore((store) => store.user);

  useEffect(() => {
    const fetchData = async () => {
      const contactsData = await Api.getContacts();
      const chatsData = await Api.getChats();

      setContacts(contactsData);
      setChats(chatsData);
    };

    fetchData();
  }, []);

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
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="primary"
            >
              Chats
            </Typography>
            <List>
              {chats.map((chat) => (
                <UserListItem
                  key={chat.id}
                  firstName={chat.firstName}
                  lastName={chat.lastName}
                  text={chat.lastMessageText}
                  date={chat.lastMessageDate}
                  status={chat.status}
                  avatarUrl={chat.avatarUrl ?? undefined}
                  backgroundColor={chat.backgroundColor ?? undefined}
                  initialsColor={chat.initialsColor ?? undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="primary"
            >
              Contacts
            </Typography>
            <List>
              {contacts.map((contact) => (
                <UserListItem
                  key={contact.id}
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  text={contact.title}
                  avatarUrl={contact.avatarUrl ?? undefined}
                  backgroundColor={contact.backgroundColor ?? undefined}
                  initialsColor={contact.initialsColor ?? undefined}
                />
              ))}
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
          <MessageItem isOutgoing={false} text="loremlorem" timestamp="12:23" />
          <MessageItem
            isOutgoing={true}
            text="loremlorem loremlorem loremlo remlo remloreml oremlore loremlo remlor emloreml orem"
          />
          <MessageItem
            isOutgoing={true}
            text="loremlorem loremlorem loremlo remlo remloreml oremlore loremlo remlor emloreml orem"
            timestamp="12:23"
          />
        </Box>
      </Box>

      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
