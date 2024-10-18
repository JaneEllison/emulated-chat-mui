import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Contact } from '../server/types.ts';
import { UserAvatar } from '../components';

type MessageItemProps = {
  text: string;
  isOutgoing: boolean;
  timestamp?: string;
  avatarUrl?: string;
  sender: Contact;
};

const MessageItem: React.FC<MessageItemProps> = ({
  text,
  isOutgoing,
  timestamp,
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
      {!isOutgoing && <Box mr={'10px'}>{renderAvatar()}</Box>}

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
        <Typography
          variant="caption"
          color={theme.palette.primary.dark}
          sx={{ display: 'block', marginTop: '5px', opacity: 0.7 }}
        >
          {timestamp}
        </Typography>
      </Box>

      {isOutgoing && <Box ml={'10px'}>{renderAvatar()}</Box>}
    </Box>
  );
};

export default MessageItem;
