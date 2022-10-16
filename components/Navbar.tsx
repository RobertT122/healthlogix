//Link to home button and drawer for site navigation
import { AppBar, Box, Typography, IconButton, Toolbar, Drawer, Button } from '@mui/material'
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';


export default function Navbar () {
  let [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <>
      <AppBar sx={{ flexDirection: 'row', py: 1, justifyContent: 'space-between'}}>
        
        <Button 
          sx={{px: 4}}
        >
          <Link href="/">
            <img src="icons/MortorPestleIcon.png" className="icon"/>
          </Link>
        </Button>

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
      </AppBar>
      <Toolbar sx={{mb: 2.5}}/>

      <Drawer anchor='right' open={isOpen} variant="temporary" onClose={toggleDrawer}>
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