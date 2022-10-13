//Link to home button and drawer for site navigation
import { AppBar, Typography, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
export default function Navbar () {
  return (
    <>
      <AppBar  sx={{ flexDirection: 'row' }}>
        <IconButton 
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h4">
          HealthLogix
        </Typography>
      </AppBar>
      <Toolbar/>
    </>
  )
}