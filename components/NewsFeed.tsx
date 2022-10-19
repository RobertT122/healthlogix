//contains a list of the most recent posts to the site
// displays title, and content for news feed
// content can include preview of a link
import { getPosts } from "../lib/firebase";
import { useEffect, useMemo, useState } from "react"
import { Container, IconButton, Box, List, ListItem } from "@mui/material";
import NewsFeedItem from "./NewsFeedItem";

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

// or blog information with optional picture
export default function NewsFeed ({ count, refresh }) {
  let [posts, setPosts] = useState([]);

  const getTopPosts = useMemo(() => {
    let now = new Date();
    return getPosts(count, now)
  }, [refresh])
  
  useEffect(()=>{getTopPosts.then(topPosts => setPosts(topPosts))}, [refresh])
  
  async function addNewPosts(newCount=count){
    let newPosts = await getPosts(newCount, posts[posts.length-1].createdAt);
    setPosts(posts.concat(newPosts));
  }

  return (
    <Container>
      <List>
        {posts.map(post => {
          return(
            <ListItem sx={{width: "100%", display:'flex', flexDirection: 'column'}}> 
              <NewsFeedItem post={post}/> 
            </ListItem>
          )
        })}
      </List>
      <Box sx={{width: "100%", display: 'flex', justifyContent: "center"}}>
        <IconButton onClick={() => addNewPosts()}>
          <ExpandCircleDownIcon />
        </IconButton>
      </Box>
    
    </Container>
  )
}