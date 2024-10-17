import React from 'react';
import { Badge, Box, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AvatarInfo, ChatStatus } from '../server/types.ts';
import { UserAvatar } from './UserAvatar.tsx';
import { formatISOToDate } from '../utils.tsx';

type UserListItemProps = {
  firstName: string;
  lastName: string;
  text: string;
  date?: string;
  status?: ChatStatus;
  isSelected?: boolean;
} & AvatarInfo;

const getStatusColor = (status: ChatStatus) => {
  switch (status) {
    case ChatStatus.Online:
      return '#44b700';
    case ChatStatus.Offline:
      return '#b0b0b0';
    case ChatStatus.Busy:
      return '#ff3d00';
  }
};

const StatusBadge = styled(Badge)(() => ({
  '& .MuiBadge-dot': {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    border: `2px solid #fff`,
  },
}));

const UserListItem: React.FC<UserListItemProps> = ({
  firstName,
  lastName,
  text,
  date,
  status,
  isSelected,
  ...avatarInfo
}) => {
  return (
    <ListItem
      sx={{
        bgColor: isSelected ? '#8b95f6' : '#fff',
        borderRadius: '10px',
        py: '10px',
        px: '15px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
          bgColor: !isSelected ? '#e4edff' : '#8b95f6',
        },
      }}
    >
      {status != null ? (
        <StatusBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          sx={{ '.MuiBadge-dot': { backgroundColor: getStatusColor(status) } }}
        >
          <UserAvatar
            user={{ ...avatarInfo, lastName, firstName }}
          ></UserAvatar>
        </StatusBadge>
      ) : (
        <UserAvatar user={{ ...avatarInfo, lastName, firstName }}></UserAvatar>
      )}
      <ListItemText
        primary={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              color={isSelected ? 'white' : 'textPrimary'}
              variant="body1"
              fontWeight="bold"
            >
              {`${firstName[0]} ${firstName[0]}`}
            </Typography>
            {date && (
              <Typography
                variant="body2"
                color={isSelected ? 'white' : 'textSecondary'}
              >
                {formatISOToDate(date)}
              </Typography>
            )}
          </Box>
        }
        secondary={
          <Typography
            variant="body2"
            color={isSelected ? 'white' : 'textSecondary'}
          >
            {text}
          </Typography>
        }
        sx={{ ml: 2 }}
      />
    </ListItem>
  );
};

export default UserListItem;
