//contains a list of the most recent posts to the site
// displays title, and content for news feed
// content can include preview of a link
import Link from "next/link";
import { auth, getPosts } from "../lib/firebase";
import { useEffect, useMemo, useState, useContext } from "react";
import {
  Container,
  IconButton,
  Box,
  List,
  ListItem,
  Typography,
  Button,
} from "@mui/material";
import NewsFeedItem from "./NewsFeedItem";
import { UserContext } from "../lib/context";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { signOut } from "firebase/auth";

// or blog information with optional picture
export default function NewsFeed({ count, update, refresh }) {
  let [posts, setPosts] = useState([]);
  let [active, setActive] = useState(-1);
  let [lastPage, setLastPage] = useState(true);

  function toggleActive(index) {
    setActive(active === index ? -1 : index);
  }

  const getTopPosts = useMemo(() => {
    let now = new Date();
    return getPosts(count, now);
  }, [refresh]);

  useEffect(() => {
    getInitialPosts();
  }, [refresh]);

  async function getInitialPosts() {
    let topPosts = await getTopPosts;
    console.log(topPosts);
    setLastPage(topPosts.lastPage);
    setPosts(topPosts.posts);
  }

  async function addNewPosts() {
    let newPosts = await getPosts(count, posts[posts.length - 1].createdAt);
    console.log(newPosts);
    setLastPage(newPosts.lastPage);
    setPosts(posts.concat(newPosts.posts));
  }

  return (
    <Container sx={{ mb: 5 }}>
      <List>
        {posts.map((post, index) => {
          return (
            <ListItem
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
              key={index}
            >
              <NewsFeedItem
                post={post}
                index={index % count}
                active={active === index}
                toggleActive={() => toggleActive(index)}
              />
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {!update ? (
          <Link href="/news">
            <Typography>
              <Button color="secondary">See more news</Button>
            </Typography>
          </Link>
        ) : !lastPage ? (
          <IconButton onClick={() => addNewPosts()}>
            <ExpandCircleDownIcon />
          </IconButton>
        ) : (
          <></>
        )}
      </Box>
    </Container>
  );
}
