import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Badge,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/system';

type UserListItemProps = {
  title: string;
  text: string;
  date: string;
  imageUrl?: string;
  status: 'active' | 'offline' | 'busy';
  isSelected?: boolean;
};

const getStatusColor = (status: 'active' | 'offline' | 'busy') => {
  switch (status) {
    case 'active':
      return '#44b700';
    case 'offline':
      return '#b0b0b0';
    case 'busy':
      return '#ff3d00';
    default:
      return '#b0b0b0';
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
  title,
  text,
  date,
  imageUrl,
  status,
  isSelected,
}) => {
  console.log('imageUrl', imageUrl);

  return (
    <ListItem
      sx={{
        bgcolor: isSelected ? '#8b95f6' : '#fff',
        borderRadius: '10px',
        py: '10px',
        px: '15px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': {
          bgcolor: !isSelected ? '#e4edff' : '#8b95f6',
        },
      }}
    >
      <StatusBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'
        sx={{ '.MuiBadge-dot': { backgroundColor: getStatusColor(status) } }}
      >
        <Avatar sx={{ width: 48, height: 48 }}>{title.charAt(0)}</Avatar>
      </StatusBadge>
      <ListItemText
        primary={
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography
              color={isSelected ? 'white' : 'textPrimary'}
              variant='body1'
              fontWeight='bold'
            >
              {title}
            </Typography>
            <Typography
              variant='body2'
              color={isSelected ? 'white' : 'textSecondary'}
            >
              {date}
            </Typography>
          </Box>
        }
        secondary={
          <Typography
            variant='body2'
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
