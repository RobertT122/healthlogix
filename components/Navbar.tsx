//Link to home button and drawer for site navigation
import { AppBar, IconButton, Toolbar, Drawer, Button, Typography, Box } from '@mui/material'
import { useState } from 'react';
import Link from 'next/link';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import WorkIcon from '@mui/icons-material/Work';


export default function Navbar () {
  let [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <>
      <AppBar sx={{ flexDirection: 'row', py: 1, justifyContent: 'space-between'}}>
        
        <IconButton 
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mx: 2, my: 'auto'}}
        >
          <Link href="/">
            <HomeIcon fontSize="large"/>
          </Link>
        </IconButton>
        <img src='icons/healthlogixtext.png' className='icon'/>
        <IconButton 
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mx: 2, my: 'auto'}}
          onClick={toggleDrawer}
        >
          <MenuIcon fontSize="large"/>
        </IconButton>
      </AppBar>
      <Toolbar sx={{mb: 2.5}}/>

      <Drawer anchor='right' open={isOpen} variant="temporary" onClose={toggleDrawer}>

        <Button variant="contained">
          <Link href="/">
            <Box sx={{display: 'flex'}}>
              <HomeIcon sx={{my: 'auto'}}/>
              <Typography variant="h6" sx={{ml: 1}}>
                Home
              </Typography>
            </Box>
          </Link>
        </Button>
          
        <Button variant="contained">
          <Link href="/news">
            <Box sx={{display: 'flex'}}>
              <FeedIcon sx={{my: 'auto'}}/>
              <Typography variant="h6" sx={{ml: 1}}>
                News
              </Typography>
            </Box>
          </Link>
        </Button>

        <Button variant="contained">
          <Link href="/carreers">
            <Box sx={{display: 'flex'}}>
              <WorkIcon sx={{my: 'auto'}}/>
              <Typography variant="h6" sx={{ml: 1}}>
                Career
              </Typography>
            </Box>
          </Link>
        </Button>

      </Drawer>
    </>
  )
}