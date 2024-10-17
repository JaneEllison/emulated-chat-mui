import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuthStore } from "../../store/authStore.ts";
import { UserAvatar } from "../../components/UserAvatar.tsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const logOut = useAuthStore(store => store.logOut);
  const user = useAuthStore(store => store.user);

  if (!user) return navigate('/');

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant='contained' onClick={handleLogout}>
        Logout
      </Button>
      <UserAvatar user={user}></UserAvatar>
    </div>
  );
};

export default Dashboard;
