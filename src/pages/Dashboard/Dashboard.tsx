import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, List, useTheme } from '@mui/material';
import { UserListItem, ResizableSidebar, UserAvatar } from '../../components';
import ChatView from './ChatView.tsx';
import { useAuthStore } from '../../store/authStore.ts';
import { Api } from '../../server';
import { Chat, Contact } from '../../server/types.ts';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const logOut = useAuthStore((store) => store.logOut);
  const user = useAuthStore((store) => store.user);

  useEffect(() => {
    const fetchData = async () => {
      const contactsData = await Api.getContacts();
      const chatsData = await Api.getChats();

      setActiveChat(chatsData[0] ?? null);
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
          backgroundColor: theme.palette.background.default,
        }}
      >
        <ResizableSidebar>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              backgroundColor: '#fff',
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              py: 3,
              px: 4,
              gap: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <UserAvatar
                avatarUrl={user.avatarUrl}
                backgroundColor={user.backgroundColor}
                initialsColor={user.initialsColor}
                firstName={user.firstName}
                lastName={user.lastName}
              />
              <Typography
                color="secondary"
                noWrap
                variant="body1"
                fontWeight="bold"
              >
                {`${user.firstName} ${user.lastName}`}
              </Typography>
            </Box>
            <Button
              sx={{ minWidth: '100px' }}
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
          <Box p={2}>
            <Box mb={4} mt={2}>
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
                    isSelected={activeChat?.id === chat.id}
                    onClick={() => setActiveChat(chat)}
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
          </Box>
        </ResizableSidebar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          {activeChat && <ChatView chat={activeChat} />}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
