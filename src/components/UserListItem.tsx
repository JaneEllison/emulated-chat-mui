import React from 'react';
import {
  Badge,
  Box,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { ChatStatus } from '../server/types.ts';
import { formatISOToDate } from '../utils.tsx';
import { UserAvatar } from '../components';

type UserListItemProps = {
  firstName: string;
  lastName: string;
  text: string;
  date?: string;
  status?: ChatStatus;
  isSelected?: boolean;
  avatarUrl?: string;
  initialsColor?: string;
  backgroundColor?: string;
  onClick?: () => void;
};

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
  isSelected = false,
  avatarUrl,
  initialsColor,
  backgroundColor,
  onClick = () => {},
}) => {
  const theme = useTheme();

  const renderAvatar = () => (
    <UserAvatar
      avatarUrl={avatarUrl}
      backgroundColor={backgroundColor}
      initialsColor={initialsColor}
      firstName={firstName}
      lastName={lastName}
    ></UserAvatar>
  );

  return (
    <ListItem
      sx={{
        bgcolor: isSelected ? theme.palette.background.paper : '#fff',
        borderRadius: '10px',
        py: 1.5,
        px: 2,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
          bgcolor: !isSelected
            ? theme.palette.primary.light
            : theme.palette.background.paper,
        },
      }}
      onClick={onClick}
    >
      {status != null ? (
        <StatusBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          sx={{ '.MuiBadge-dot': { backgroundColor: getStatusColor(status) } }}
        >
          {renderAvatar()}
        </StatusBadge>
      ) : (
        renderAvatar()
      )}
      <ListItemText
        primary={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              color={
                isSelected ? theme.palette.primary.contrastText : 'secondary'
              }
              variant="body1"
              fontWeight="bold"
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {`${firstName} ${lastName}`}
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
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineBreak: 'anywhere',
              WebkitLineClamp: 2,
            }}
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
