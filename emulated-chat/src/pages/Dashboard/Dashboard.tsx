import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant='contained' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
