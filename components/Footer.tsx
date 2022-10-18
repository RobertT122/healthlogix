// Contains links to social media and site navigation
import { Container, IconButton, Tooltip, Modal, Box, Typography, Divider } from "@mui/material"
import { Facebook, Email, LocalPhone } from '@mui/icons-material';
import { useState } from "react";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 1,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function Footer () {
  let [modalType, setModalType] = useState('closed');
  
  function PhoneNumberModal() {
    return(
      <Modal
        closeAfterTransition
        open={modalType !== 'closed'}
        onClose={()=>setModalType('closed')}
      >
        <Box  sx={style}>
          { modalType === 'phoneNumber' ?
              <a href="tel:6313070256" className="footer-modal">
                <Typography variant='h4' align="center" >
                  6313070256
                </Typography>
              </a>
            : modalType === 'email'?
                <a href="mailto:robert@tetrault.org" className="footer-modal">
                  <Typography variant='h4' align="center" >
                    robert@tetrault
                  </Typography>
                </a>
              :
              'error'
          }
        </Box>
      </Modal>
    )
  }

  return (
    <>
    <Divider sx={{mt: 10}}/>
      <Container sx={{display: 'flex', justifyContent: 'space-evenly', mb: 2}}>
        <Tooltip title="Facebook">
          <a href="https://www.facebook.com/tacobell/">
            <IconButton size="large" >
              <Facebook fontSize="large"/>
            </IconButton>
          </a>
        </Tooltip>

        <Tooltip title="Email">
          <IconButton size="large" onClick={()=>setModalType('email')} >
            <Email fontSize="large"/>
          </IconButton>
        </Tooltip>

        <Tooltip title="Phone">
          <IconButton size="large" onClick={()=>setModalType('phoneNumber')} >
            <LocalPhone fontSize="large"/>
          </IconButton>
        </Tooltip>
      </Container>
      <PhoneNumberModal />
    </>
  )
}
