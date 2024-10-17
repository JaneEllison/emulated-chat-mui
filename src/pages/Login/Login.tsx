import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Api } from "../../server";
import { useAuthStore } from "../../store/authStore.ts";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const logIn = useAuthStore(state => state.logIn);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    if (!enteredEmail || !enteredPassword) {
        setError('Please enter email and password');
        return;
    }

    try {
      const userData = await Api.signIn(enteredEmail, enteredPassword);
      logIn(userData);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f0f0f8',
      }}
    >
      <Container component='section' maxWidth='xs'>
        <Paper
          elevation={2}
          square={false}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LockIcon color='primary' fontSize='large' sx={{ mb: 1 }} />
          <Typography variant='h5' align='center'>
            Sign In
          </Typography>
          <Box
            component='form'
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              id='email'
              inputRef={emailRef}
              label='Email Address'
              name='email'
              type='text'
              margin='normal'
              required
              fullWidth
              autoComplete='email'
              autoFocus
            />
            <TextField
              id='password'
              inputRef={passwordRef}
              label='Password'
              name='password'
              type='password'
              margin='normal'
              required
              fullWidth
              autoComplete='current-password'
            />
            {error && (
              <Alert severity='error' sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
