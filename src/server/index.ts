import { Contact, Chat, Message, NewMessageCallback } from './types.ts';
import { contacts } from './db/contacts.ts';
import { chats } from './db/chats.ts';
import { messages } from './db/messages.ts';
import { testAccount, testCredentials } from './db/test-account.ts';

let newMessageCallback: NewMessageCallback = () => {};

export const Api = {
  getContacts(): Promise<Contact[]> {
    return Promise.resolve(contacts);
  },
  getChats(): Promise<Chat[]> {
    return Promise.resolve(chats);
  },
  getChatMessages(chatId: number): Promise<Message[]> {
    const chatMessages = messages.filter((m) => m.chatId === chatId);

    return Promise.resolve(chatMessages);
  },
  sendMessage(chatId: number, message: string): Promise<Message> {
    const messageObject: Message = {
      messageId: getNextChatMsgId(chatId),
      chatId,
      senderId: testAccount.id,
      message,
      date: new Date().toISOString(),
    };

    messages.push(messageObject);

    if (!message.endsWith('.')) {
      setTimeout(() => {
        const responseMsg: Message = {
          messageId: getNextChatMsgId(chatId),
          chatId,
          senderId: chatId,
          date: new Date().toISOString(),
          message: 'Ok',
        };
        newMessageCallback(responseMsg);
        messages.push(responseMsg);
      }, 500);
    }

    return Promise.resolve(messageObject);
  },
  subscribeToNewMessages(callback: NewMessageCallback): void {
    newMessageCallback = callback;
  },
  signIn(login: string, password: string): Promise<Contact> {
    if (
      login !== testCredentials.login ||
      password !== testCredentials.password
    ) {
      return Promise.reject({
        error: 'Invalid email or password. Please try again.',
      });
    }
    return Promise.resolve(testAccount);
  },
};

function getNextChatMsgId(chatId: number): number {
  const lastMsg = messages.findLast((msg) => msg.chatId === chatId);

  return lastMsg ? lastMsg.messageId + 1 : 0;
}
