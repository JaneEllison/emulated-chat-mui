import { Box, Button, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          margin: '0 auto',
          padding: '15px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          sx={{ mr: 1, overflowY: 'auto' }}
          variant="outlined"
          minRows={1}
          maxRows={5}
          size="small"
          fullWidth
          multiline
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          onKeyDown={(e) => e.code === 'Enter' && sendMessage()}
        />
        <Button
          onClick={sendMessage}
          disabled={isEmpty}
          color="primary"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </>
  );
}
