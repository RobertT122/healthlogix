import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { defaultTheme } from "../lib/themes";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  
  return (
    <UserContext.Provider value={Object.assign(userData)}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
