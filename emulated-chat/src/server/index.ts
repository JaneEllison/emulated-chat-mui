import { Contact, Chat, Message } from "./types.ts";
import { contacts } from "./db/contacts.ts";
import { chats } from "./db/chats.ts";
import { messages } from "./db/messages.ts";
import { testAccount, testCredentials } from "./db/test-account.ts";

export const Api = {
    getContacts(): Promise<Contact[]> {
        return Promise.resolve(contacts);
    },
    getChats(): Promise<Chat[]> {
        return Promise.resolve(chats);
    },
    getChatMessages(chatId: number): Promise<Message[]> {
        const chatMessages = messages.filter(m => m.chatId === chatId);

        return Promise.resolve(chatMessages)
    },
    sendMessage(userId: number, message: string): Promise<Message> {
        const messageObject: Message = {
            messageId: (messages[messages.length-1]?.messageId ?? -1) + 1,
            chatId: userId,
            senderId: testAccount.id,
            message,
            date: new Date().toISOString(),
        };

        messages.push(messageObject);

        return Promise.resolve(messageObject);
    },
    signIn(login: string, password: string): Promise<Contact> {
        if (login !== testCredentials.login || password !== testCredentials.password) {
            return Promise.reject({ error: 'Invalid email or password. Please try again.' });
        }
        return Promise.resolve(testAccount);
    }
}