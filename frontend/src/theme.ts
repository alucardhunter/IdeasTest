import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#42A5F5' },
    secondary: { main: '#90CAF9' },
    background: { default: '#E3F2FD', paper: '#FFFFFF' },
    text: { primary: '#000000ff' },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, textTransform: 'none' },
      },
    },
  },
});

export default theme;