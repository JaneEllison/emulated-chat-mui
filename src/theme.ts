import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e6dc9',
      light: '#e4edff',
      dark: '#2b3689',
      contrastText: '#fff',
    },
    secondary: {
      main: '#000000de',
    },
    error: {
      main: '#f44336',
      dark: '#8f1210',
    },
    background: {
      default: '#f5f5f5',
      paper: '#5e6dc9',
    },
  },
});

export default theme;
