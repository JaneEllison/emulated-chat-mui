import { Chat, Message } from '../../server/types.ts';
import { MessageItem, UserAvatar } from '../../components';
import { Api } from '../../server';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore.ts';
import { useNavigate } from 'react-router-dom';
import { MessageInput } from '../../components/MessageInput.tsx';
import { Box } from '@mui/material';

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
  }, [chat.id]);

  if (!activeUser) {
    navigate('/');
    return null;
  }

  const isOutgoing = (message: Message) => {
    return message.senderId === activeUser.id;
  };

  const getTimestamp = (
    messages: Message[],
    currentIndex: number
  ): string | undefined => {
    const msg = messages[currentIndex];
    const nextMsg = messages[currentIndex + 1];

    if (!nextMsg || msg.senderId !== nextMsg.senderId) return msg.date;
    return undefined;
  };

  const sendMessage = async (message: string) => {
    const newMessage = await Api.sendMessage(chat.id, message);
    setMessages([...messages, newMessage]);
  };

  return (
    <>
      <Box bgcolor={'#dddddd'}>
        <UserAvatar
          firstName={chat.firstName}
          lastName={chat.lastName}
          avatarUrl={chat.avatarUrl}
          backgroundColor={chat.backgroundColor}
          initialsColor={chat.initialsColor}
        />
        {`${chat.firstName} ${chat.lastName}`}
      </Box>
      {messages.map((message, index) => (
        <MessageItem
          key={message.messageId}
          isOutgoing={isOutgoing(message)}
          text={message.message}
          timestamp={getTimestamp(messages, index)}
          sender={isOutgoing(message) ? activeUser : chat}
        />
      ))}
      {!messages.length && 'No messages yet :('}
      <MessageInput onSend={sendMessage} />
    </>
  );
}
