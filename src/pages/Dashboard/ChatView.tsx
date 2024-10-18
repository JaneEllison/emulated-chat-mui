import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { MessageItem, UserAvatar, MessageInput } from '../../components';
import { Chat, Message } from '../../server/types.ts';
import { Api } from '../../server';
import { useAuthStore } from '../../store/authStore.ts';

type ChatViewProps = {
  chat: Chat;
  onLastMessageUpdate: (message: Message) => void;
};

const ChatView = ({ chat, onLastMessageUpdate }: ChatViewProps) => {
  const navigate = useNavigate();
  const activeUser = useAuthStore((state) => state.user);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [search, setSearch] = useState('');
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    (async () => {
      setMessages(await Api.getChatMessages(chat.id));
    })();
    hideSearch();
  }, [chat]);

  useEffect(() => {
    Api.subscribeToNewMessages((msg) => {
      if (msg.chatId === chat.id) setMessages([...messages, msg]);
      onLastMessageUpdate(msg);
    });
    scrollToLastMessage();
  }, [chat, messages, onLastMessageUpdate]);

  useEffect(() => {
    scrollToLastSearchResult();
  }, [search, messages]);

  if (!activeUser) {
    navigate('/');
    return null;
  }

  const isOutgoing = (message: Message) => {
    return message.senderId === activeUser.id;
  };

  const isLastMessage = (
    messages: Message[],
    currentIndex: number
  ): boolean => {
    const msg = messages[currentIndex];
    const nextMsg = messages[currentIndex + 1];
    return !nextMsg || msg.senderId !== nextMsg.senderId;
  };

  const isFirstMessage = (
    messages: Message[],
    currentIndex: number
  ): boolean => {
    const msg = messages[currentIndex];
    const prevMsg = messages[currentIndex - 1];
    return !prevMsg || msg.senderId !== prevMsg.senderId;
  };

  const sendMessage = async (message: string) => {
    const newMessage = await Api.sendMessage(chat.id, message);
    onLastMessageUpdate(newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const scrollToLastMessage = () => {
    const lastMessage = messageRefs.current[messageRefs.current.length - 1];
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  };

  const scrollToLastSearchResult = () => {
    if (!search) return;

    const lastSearchResultIndex = messages.findLastIndex((msg) =>
      msg.message.toLowerCase().includes(search.toLowerCase())
    );

    if (lastSearchResultIndex !== -1) {
      const lastSearchMessage = messageRefs.current[lastSearchResultIndex];
      if (lastSearchMessage) {
        lastSearchMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      hideSearch();
    }
  };

  const searchToggle = () => {
    setIsSearchVisible((prev) => !prev);
    setSearch('');
  };

  const hideSearch = () => {
    setIsSearchVisible(false);
    setSearch('');
  };

  return (
    <>
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
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <UserAvatar
            firstName={chat.firstName}
            lastName={chat.lastName}
            avatarUrl={chat.avatarUrl}
            backgroundColor={chat.backgroundColor}
            initialsColor={chat.initialsColor}
          />
          <Typography color="secondary" variant="body1" fontWeight="bold">
            {`${chat.firstName} ${chat.lastName}`}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={searchToggle} color="inherit">
              <SearchIcon />
            </IconButton>
            {isSearchVisible && (
              <TextField
                value={search}
                variant="outlined"
                size="small"
                placeholder="Search..."
                autoFocus
                sx={{ marginLeft: 2 }}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          pt: 0,
          maxWidth: '800px',
          marginX: 'auto',
          width: '-webkit-fill-available',
          height: 'fit-content',
          maxHeight: 'calc(100% - 103px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          flexGrow: 1,
        }}
      >
        {messages.length ? (
          <Box
            sx={{
              overflowY: 'auto',
              pt: 1,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {messages.map((message, index) => {
              const getRef = (element: HTMLDivElement) => {
                messageRefs.current[index] = element;
              };

              return (
                <MessageItem
                  ref={getRef}
                  key={message.messageId}
                  isOutgoing={isOutgoing(message)}
                  text={message.message}
                  timestamp={message.date}
                  isLastMessage={isLastMessage(messages, index)}
                  isFirstMessage={isFirstMessage(messages, index)}
                  sender={isOutgoing(message) ? activeUser : chat}
                  highlightText={search}
                />
              );
            })}
          </Box>
        ) : (
          <Box sx={{ m: 'auto', textAlign: 'center' }}>
            <ChatBubbleOutlineIcon style={{ fontSize: 70, color: '#ccc' }} />
            <Typography color="secondary" variant="body1" fontWeight="bold">
              No messages yet :(
            </Typography>
          </Box>
        )}
        <MessageInput onSend={sendMessage} />
      </Box>
    </>
  );
};

export default ChatView;
