import { Container, Card, Typography, Divider, Box } from "@mui/material";
import { contact } from "../lib/basicInfo"

export default function ContactPage() {

  return (
    <Container>
      <Card sx={{p: 4}}>
        <Typography variant="h4" align="center" sx={{mb: 1}}> Contact Information</Typography> 
        <Divider/>
        <Box sx={{display: 'flex', flexDirection: 'column', m: 2}}>

          <Box sx={{display: 'flex', justifyContent: "center"}}>
            <Typography sx={{mx: 2}}>
              Phone Number:
            </Typography>
            <Typography color="secondary">
              <a href={contact.phone.link}>{contact.phone.title}</a>
            </Typography>
          </Box>
          <br/>
          <Box sx={{display: 'flex', justifyContent: "center"}}>
            <Typography sx={{mx: 2}}>
              Email:
            </Typography>
            <Typography color="secondary">
              <a href={contact.email.link}>{contact.email.title}</a>

            </Typography>
          </Box>
          <br/>
          <Box sx={{display: 'flex', justifyContent: "center"}}>
            <Typography sx={{mx: 2}}>
              Facebook:
            </Typography>
            <Typography color="secondary">
              <a href={contact.facebook.link}>Checkout Our Page!</a>

            </Typography>
          </Box>
          <br/>
          <Box sx={{display: 'flex', justifyContent: "center"}}>
            <Typography sx={{mx: 2}}>
              Location:
            </Typography>
            <Typography color="secondary">
              <a href={contact.location.link}>{contact.location.title}</a>
            </Typography>
          </Box>

        </Box>
      </Card>
    </Container>
  )
}