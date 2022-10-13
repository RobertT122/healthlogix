//Link to home button and drawer for site navigation
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
export default function Navbar () {
  return (
    <>
      <AppBar>
        <IconButton>
          <MenuIcon/>
        </IconButton>
      </AppBar>
      <Toolbar/>
    </>
  )
}