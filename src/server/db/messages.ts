import { Message } from '../types.ts';

export const messages: Message[] = [
  {
    messageId: 1,
    chatId: 1,
    senderId: 0,
    message: 'Hello!',
    date: '2024-10-17T19:59:00.000Z',
  },
  {
    messageId: 2,
    chatId: 1,
    senderId: 1,
    message: "What's up?",
    date: '2024-10-17T19:59:00.000Z',
  },
  {
    messageId: 1,
    chatId: 2,
    senderId: 2,
    message: 'I have an urgent request',
    date: '2024-10-17T19:59:00.000Z',
  },
  {
    messageId: 2,
    chatId: 2,
    senderId: 2,
    message: 'Really urgent one',
    date: '2024-10-17T19:59:00.000Z',
  },
  {
    messageId: 3,
    chatId: 2,
    senderId: 0,
    message: "How can I help you? :'(",
    date: '2024-10-17T19:59:00.000Z',
  },
];
