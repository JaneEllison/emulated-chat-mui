import { Avatar } from "@mui/material";
import { AvatarInfo, Contact } from "../server/types.ts";

export function UserAvatar({ user }: { user: AvatarInfo & Pick<Contact, 'firstName' | 'lastName'> }) {
  return <Avatar
    src={`/avatars/${user.avatarUrl}`}
  >
    {!user.avatarUrl ? `${user.firstName[0]} ${user.lastName[0]}` : ''}
  </Avatar>;
}