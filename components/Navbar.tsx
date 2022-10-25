//Link to home button and drawer for site navigation
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

import { useRouter } from "next/router";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import WorkIcon from "@mui/icons-material/Work";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  const portrait = !useMediaQuery("(min-aspect-ratio: 1/1)");


  return (
    <>
      <AppBar
        sx={{
          flexDirection: "row",
          py: 1,
          px: 2,
          justifyContent: "space-between",
        }}
        >
        {portrait ? (
          <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="menu"
          sx={{ my: "auto", transition: "1s" }}
          >
            <Link href="/">
              <HomeIcon fontSize="large" />
            </Link>
          </IconButton>
        ) : (
          <></>
          )}
        <Box>
          {portrait ? (
            <img src="icons/healthlogixtext.png" className="icon" />
          ) : (
            <Button sx={{ mx: 0, p: 0 }}>
              <Link href="/">
                <img src="icons/healthlogixtext.png" className="icon" />
              </Link>
            </Button>
          )}
        </Box>
        {portrait ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ my: "auto" }}
              onClick={toggleDrawer}
              >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer
              anchor="right"
              open={isOpen}
              variant="temporary"
              onClose={toggleDrawer}
              >
              <ButtonList home={true} />
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex" }}>
            <ButtonList home={false} />
          </Box>
        )}
      </AppBar>
      <Toolbar sx={{ mb: 3.5 }} />
    </>
  );
}

function ButtonList({ home }) {
  const offset = home ? 0 : 1;
  let user = useContext(UserContext);
  let router = useRouter();

  return (
    <>
      {buttons.slice(offset).map(({ name, link, Icon }) => {
        return (
          <Button
          variant="outlined"
          color="secondary"
          sx={{ px: 2, mx: 1, my: 1 }}
          key={name}
          >
            <Link href={link}>
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {Icon}
                <Typography variant="body1">{name}</Typography>
              </Box>
            </Link>
          </Button>
        );
      })}
        {user.user? (
        <Button
          onClick={(e) => {
            console.log(user)
            e.preventDefault();
            auth.signOut();
            router.push('/')
          }}
          color="error"
          variant="outlined"
          sx={{ px: 2, mx: 1, my: 1 }}
        >
          Logout
        </Button>
      ) : (
        //Add login route here
        <></>
      )}
    </>
  );
}

const buttonSx = { my: "auto", mr: 2 };
const buttons = [
  {
    name: "Home",
    link: "/",
    Icon: <HomeIcon sx={buttonSx} />,
  },
  {
    name: "News",
    link: "/news",
    Icon: <FeedIcon sx={buttonSx} />,
  },
  {
    name: "Careers",
    link: "/careers",
    Icon: <WorkIcon sx={buttonSx} />,
  },
  {
    name: "Contact",
    link: "/contact",
    Icon: <QuestionAnswerIcon sx={buttonSx} />,
  },
];
