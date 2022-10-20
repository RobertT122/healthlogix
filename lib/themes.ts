import { createTheme, responsiveFontSizes } from '@mui/material/styles';


export const defaultTheme = responsiveFontSizes(createTheme({
  palette:{
    mode: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#608c61',
    },
  }
}));