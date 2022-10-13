//Link to home button and drawer for site navigation
import { AppBar, Typography, IconButton, Toolbar, Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';


export default function Navbar () {
  let [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <>
      <AppBar  sx={{ flexDirection: 'row', py: 1}}>
        <IconButton 
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mx: 1}}
          onClick={toggleDrawer}
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h4" >
          HealthLogix
        </Typography>
      </AppBar>
      <Toolbar/>

      <Drawer anchor='left' open={isOpen} variant="temporary" onClose={toggleDrawer}>
        <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mx: 1}}
          >
            <MenuIcon/>
          </IconButton>
      </Drawer>
    </>
  )
}