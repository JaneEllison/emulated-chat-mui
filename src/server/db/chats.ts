import { ChatModel, ChatStatus } from '../types.ts';

export const chats: ChatModel[] = [
  {
    chatId: 1,
    status: ChatStatus.Online,
  },
  {
    chatId: 2,
    status: ChatStatus.Offline,
  },
  {
    chatId: 3,
    status: ChatStatus.Busy,
  },
  {
    chatId: 4,
    status: ChatStatus.Offline,
  },
];
