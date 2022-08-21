import { createTheme, styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

export const customTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(to right, #FED570, #FE96B0)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: '#fff',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',
            cursor: 'not-allowed',
            pointerEvents: 'all !important',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',
          },
          '& .MuiSelect-icon': {
            color: '#fff',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#FFFFFF',
    },
  },
});

export const StyledButton = styled(MuiButton)(() => ({
  background: '#FFFFFF',
  fontWeight: 400,
  fontSize: '1.5rem',
  color: '#666666',
  textAlign: 'center',
  borderRadius: '40px',
  padding: '20px 80px',
  fontFamily: 'DM Serif Display',
  textTransform: 'none',
  margin: '1rem',
  '&:hover': {
    background: '#F0A49D',
  },
}));
