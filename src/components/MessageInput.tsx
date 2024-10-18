import { Box, Button, TextField } from '@mui/material';
import { useMemo, useState } from 'react';

type MessageInputProps = {
  onSend: (message: string) => void;
};

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const isEmpty = useMemo(() => {
    return !message.length;
  }, [message]);

  const sendMessage = () => {
    if (isEmpty) return;
    onSend(message);
    setMessage('');
  };

  return (
    <>
      <Box>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={(e) => e.code === 'Enter' && sendMessage()}
          variant="outlined"
        />
        <Button onClick={sendMessage} disabled={isEmpty} variant="contained">
          Send
        </Button>
      </Box>
    </>
  );
}
