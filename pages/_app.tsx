import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { UserContext } from "../lib/context"
import { useUserData } from "../lib/hooks";
import { ThemeProvider } from "@mui/material/styles"
import { darkTheme } from "../lib/themes"

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider theme={darkTheme}>
        <Navbar/>
        <Component {...pageProps} />
        <Footer/>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default MyApp
