import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

type MessageItemProps = {
  text: string;
  isOutgoing: boolean;
  timestamp?: string;
  avatarUrl?: string;
};

const MessageItem: React.FC<MessageItemProps> = ({
  text,
  isOutgoing,
  timestamp,
  avatarUrl,
}) => {
  const backgroundColor = isOutgoing ? '#8b95f6' : '#fff';
  const textColor = isOutgoing ? '#fff' : 'textPrimary';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
        alignItems: 'top',
        mb: 1,
      }}
    >
      {!isOutgoing && (
        <Avatar
          src={avatarUrl}
          sx={{
            width: 48,
            height: 48,
            marginRight: '10px',
            alignSelf: 'flex-start',
          }}
        />
      )}

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
            color: '#fff',
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
          color="textPrimary"
          sx={{ display: 'block', marginTop: '5px', opacity: 0.7 }}
        >
          {timestamp}
        </Typography>
      </Box>

      {isOutgoing && (
        <Avatar
          src={avatarUrl}
          sx={{
            width: 48,
            height: 48,
            marginLeft: '10px',
            alignSelf: 'flex-start',
          }}
        />
      )}
    </Box>
  );
};

export default MessageItem;
