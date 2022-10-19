import { Card, Box, Typography, Divider, Container, Collapse } from "@mui/material"
import { useState } from "react"

const textOuntline = "-1px -1px 0 #888, 1px -1px 0 #888, -1px 1px 0 #888, 1px 1px 0 #888"
export default function NewsFeedItem({post}) {
  let [opacity, setOpacity] = useState(95)
  let [contentVisible, setContentVisible] = useState(false)

  return(
    <Card 
      sx={{width: "100%", m:0, maxWidth: 900, minWidth: 400, p: 1}} 
      className="news-feed-card"
      onMouseLeave={()=> setContentVisible(false)}
    >
      {/* <img src={post.imageURL} /> */}
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          aspectRatio: "9/3",
          backgroundImage: `url(${post.imageURL})`, 
          backgroundSize: '100%' ,
          opacity: `${opacity}%`,
          pb: 4,
          borderRadius: 1
        }}

        onMouseEnter={() => {
          setOpacity(100)
        }}
        onMouseLeave={() => {
          setOpacity(95)
        }}
        onClick={() => setContentVisible(true)}
      >
        <Typography 
          variant="subtitle2" 
          color="primary"
          align="right"
          sx={{p:2, textShadow: textOuntline}}
        >
          {post.createdAt.toDateString()}
        </Typography>
        <Typography 
          variant='h4' 
          color="primary"
          align="center"
          sx={{my: "auto", textShadow: textOuntline}}
        >
          {post.title}
        </Typography>
      </Box>

      <Collapse in={contentVisible}>
        <Divider/>
        <Container sx={{py: 4}}>
          <Typography>
            {post.body}
          </Typography>
        </Container>
      </Collapse>


    </Card>
  )
}

