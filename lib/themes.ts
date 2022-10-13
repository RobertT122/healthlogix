import { createTheme, ThemeOptions } from '@mui/material/styles';



const darkPalette: ThemeOptions= {
  palette:{
    mode: 'dark',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#1565c0',
    },
  }
}

export const darkTheme = createTheme(darkPalette);