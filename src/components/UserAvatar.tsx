import { Avatar } from '@mui/material';

type AvatarProps = {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  initialsColor?: string;
  backgroundColor?: string;
};

export default function UserAvatar({
  firstName,
  lastName,
  avatarUrl,
  initialsColor,
  backgroundColor,
}: AvatarProps) {
  return (
    <Avatar
      src={avatarUrl ? `/avatars/${avatarUrl}` : undefined}
      sx={{
        color: initialsColor,
        backgroundColor: backgroundColor,
      }}
    >
      {`${firstName[0]} ${lastName[0]}`}
    </Avatar>
  );
}
