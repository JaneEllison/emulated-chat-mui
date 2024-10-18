import { Box, Button, TextField } from '@mui/material';
import { useRef } from 'react';

type MessageInputProps = {
  onSend: (message: string) => void;
};

export function MessageInput({ onSend }: MessageInputProps) {
  const input = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Box>
        <TextField inputRef={input} variant="outlined" />
        <Button
          onClick={() => {
            if (!input.current) return;
            onSend(input.current.value);
            input.current.value = '';
          }}
          variant="contained"
        >
          Send
        </Button>
      </Box>
    </>
  );
}
