import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Contact } from '../server/types.ts';
import { UserAvatar } from '../components';
import { formatISOTo12HourTime } from '../utils.tsx';

type MessageItemProps = {
  text: string;
  isOutgoing: boolean;
  timestamp?: string;
  isLastMessage?: boolean;
  isFirstMessage?: boolean;
  avatarUrl?: string;
  sender: Contact;
};

const MessageItem: React.FC<MessageItemProps> = ({
  text,
  isOutgoing,
  timestamp,
  isLastMessage,
  isFirstMessage,
  sender,
}) => {
  const theme = useTheme();
  const backgroundColor = isOutgoing ? theme.palette.primary.main : '#fff';
  const textColor = isOutgoing
    ? theme.palette.primary.contrastText
    : 'secondary';

  const renderAvatar = () => (
    <UserAvatar
      firstName={sender.firstName}
      lastName={sender.lastName}
      avatarUrl={sender.avatarUrl}
      initialsColor={sender.initialsColor}
      backgroundColor={sender.backgroundColor}
    />
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
        alignItems: 'top',
        mb: 1,
      }}
    >
      <Box sx={{ mr: '10px', minWidth: 40 }}>
        {isFirstMessage && !isOutgoing && renderAvatar()}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isOutgoing ? 'end' : 'start',
          maxWidth: '70%',
        }}
      >
        <Box
          sx={{
            padding: '10px 15px',
            borderRadius: '10px',
            backgroundColor: backgroundColor,
            textAlign: isOutgoing ? 'right' : 'left',
            boxShadow: 1,
          }}
        >
          <Typography variant="body1" color={textColor}>
            {text}
          </Typography>
        </Box>
        {isLastMessage && timestamp && (
          <Typography
            variant="caption"
            color={theme.palette.primary.dark}
            sx={{ display: 'block', marginTop: '5px', opacity: 0.7 }}
          >
            {formatISOTo12HourTime(timestamp)}
          </Typography>
        )}
      </Box>
      <Box sx={{ ml: '10px', minWidth: 40 }}>
        {isFirstMessage && isOutgoing && renderAvatar()}
      </Box>
    </Box>
  );
};

export default MessageItem;
