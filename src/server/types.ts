export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  avatarUrl?: string;
  initialsColor?: string;
  backgroundColor?: string;
};

export type Chat = Contact & {
  lastMessageText: string;
  lastMessageDate: string;
  status: ChatStatus;
};

export enum ChatStatus {
  Offline,
  Online,
  Busy,
}

export type Message = {
  messageId: number;
  // For simplicity there are no group chats and chatId always equals to contact/recipient id
  chatId: number;
  senderId: number;
  message: string;
  date: string;
};

export type NewMessageCallback = (message: Message) => void;
