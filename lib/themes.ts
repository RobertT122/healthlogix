import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/roboto/400.css";

export const defaultTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#608c61",
      },
    },
  })
);
