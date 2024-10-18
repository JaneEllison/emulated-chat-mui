import { Chat, Message } from '../../server/types.ts';
import { MessageItem, UserAvatar } from '../../components';
import { Api } from '../../server';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore.ts';
import { useNavigate } from 'react-router-dom';
import { MessageInput } from '../../components/MessageInput.tsx';
import { Box, Typography } from '@mui/material';

type ChatViewProps = {
  chat: Chat;
};

export function ChatView({ chat }: ChatViewProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const activeUser = useAuthStore((state) => state.user);

  useEffect(() => {
    (async () => {
      setMessages(await Api.getChatMessages(chat.id));
    })();
  }, [chat]);

  useEffect(() => {
    Api.subscribeToNewMessages((msg) => {
      if (msg.chatId === chat.id) setMessages([...messages, msg]);
    });
  }, [chat, messages]);

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
    setMessages([...messages, newMessage]);
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
      </Box>
      <Box
        sx={{
          p: 2,
          maxWidth: '800px',
          marginX: 'auto',
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{}}>
          {messages.map((message, index) => (
            <MessageItem
              key={message.messageId}
              isOutgoing={isOutgoing(message)}
              text={message.message}
              timestamp={message.date}
              isLastMessage={isLastMessage(messages, index)}
              isFirstMessage={isFirstMessage(messages, index)}
              sender={isOutgoing(message) ? activeUser : chat}
            />
          ))}
          {!messages.length && 'No messages yet :('}
        </Box>

        <MessageInput onSend={sendMessage} />
      </Box>
    </>
  );
}
