import { Chat, Message } from '../../server/types.ts';
import { MessageItem } from '../../components';
import { Api } from '../../server';
import { useEffect, useState } from 'react';

type ChatViewProps = {
  chat: Chat;
};

export function ChatView({ chat }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    (async () => {
      setMessages(await Api.getChatMessages(chat.id));
    })();
  }, []);

  return (
    <>
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
    </>
  );
}
