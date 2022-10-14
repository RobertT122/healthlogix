import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/globals.css"

import { UserContext } from "../lib/context"
import { useUserData } from "../lib/hooks";

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from '@mui/material/CssBaseline';
import { defaultTheme } from "../lib/themes"

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <UserContext.Provider value={userData}>
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default MyApp
