import {
  Container,
  IconButton,
  Tooltip,
  Modal,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Facebook, Email, LocalPhone, Place } from "@mui/icons-material";
import { useState } from "react";
import { contact } from "../lib/basicInfo";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 1,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Footer() {
  let [modalType, setModalType] = useState("closed");

  function FooterModal() {
    return (
      <Modal
        closeAfterTransition
        open={modalType !== "closed"}
        onClose={() => setModalType("closed")}
      >
        <Box sx={style}>
          {(() => {
            switch (modalType) {
              case "phoneNumber":
                return (
                  <a href={contact.phone.link} className="footer-modal">
                    <Typography variant="h4" align="center">
                      {contact.phone.title}
                    </Typography>
                  </a>
                );
              case "email":
                return (
                  <a href={contact.email.link} className="footer-modal">
                    <Typography variant="h4" align="center">
                      {contact.email.title}
                    </Typography>
                  </a>
                );

              case "location":
                return (
                  <a href={contact.location.link} className="footer-modal">
                    <Typography variant="h4" align="center">
                      {contact.location.title}
                    </Typography>
                  </a>
                );
              default:
                return <Typography>error</Typography>;
            }
          })()}
        </Box>
      </Modal>
    );
  }

  return (
    <>
      <Divider sx={{ mt: 10 }} />
      <Container
        sx={{ display: "flex", justifyContent: "space-evenly", mb: 2 }}
      >
        <Tooltip title="Facebook">
          <a href={contact.facebook.link}>
            <IconButton size="large">
              <Facebook fontSize="large" />
            </IconButton>
          </a>
        </Tooltip>

        <Tooltip title="Email">
          <IconButton size="large" onClick={() => setModalType("email")}>
            <Email fontSize="large" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Phone">
          <IconButton size="large" onClick={() => setModalType("phoneNumber")}>
            <LocalPhone fontSize="large" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Location">
          <IconButton size="large" onClick={() => setModalType("location")}>
            <Place fontSize="large" />
          </IconButton>
        </Tooltip>
      </Container>
      <FooterModal />
    </>
  );
}
