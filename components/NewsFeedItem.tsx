import React from "react"
import { Card, CardMedia, Box, Typography, Divider, Container, Collapse, Grow} from "@mui/material"
import { useState } from "react"

const initialOpacity = 80;

export default function NewsFeedItem({post, index=0, active ,toggleActive }) {
  
  let [hover, setHover] = useState(false)
  // let [contentVisible, setContentVisible] = useState(false)
  return(
    <Grow in={true} timeout={index*500 + 500}>
      <Card 
        variant="outlined"
        sx={{width: "100%", m:0, maxWidth: 900, minWidth: 400, backgroundColor: "rgb(247, 247, 247)"}} 
        className="news-feed-card"
        onMouseLeave={()=> {
          setHover(false)
        }}
      >
        <Box 
          component="div"
          sx={{
            position: 'relative',
            backgroundColor: 'black',
          }}

          onMouseEnter={() => {
            setHover(true)
          }}

          onClick={toggleActive}
        >
          <CardMedia
            component="img"
            image={post.imageURL}
            sx={{
              objectFit:'cover', 
              height:'100%',
              opacity: `${hover || active? 100 : initialOpacity}%`,
              aspectRatio: `${active? '2' : '3'}`,
              transition: 'aspect-ratio 1s, opacity 0.2s ease-in-out'
            }}

          />
          <Box sx={{position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent:'space-between', top:0, left:0, m:0, p:0, width:1, height:1}}>
            <Typography 
              variant="subtitle2" 
              color="Grey"
              align="right"
              sx={{p:2, opacity: '60%'}}
            >
              {post.createdAt.toDateString()}
            </Typography>
            <Collapse in={!active} timeout={300}>
              <Box 
                sx={{
                  backgroundColor: `rgba(0,0,0, ${hover? .2 : 0})`,
                  borderRadius: 1,
                  transition: "background-color 0.2s ease-in-out",
                  px: 2,
                  pb: 3,
                  pt: 1
                }} 
              >
                <Typography 
                  variant='h5' 
                  color="white"
                  align="left"
                >
                  {post.title}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </Box>

        <Collapse in={active} timeout={600}>
          <Container sx={{py: 4}}>
            <Typography variant="h4">
              {post.title}
            </Typography>
            <Divider sx={{my: 1}}/>
            <Typography variant='h6' sx={{whiteSpace: 'pre-wrap'}}>
              <div dangerouslySetInnerHTML={{__html: parseText(post.body)}}></div>
            </Typography>
          </Container>
        </Collapse>

      </Card>
    </Grow>
  )
}

const parseText = function(text) {
  let reg = /\[(?<name>[^\]]*)\]\((?<link>[^\)]*)\)/g;
  let output;
  let i = 0;

  let mappedText = ''
  while((output = reg.exec(text)) !== null){
    mappedText += text.slice(i, output.index)
    i = output.index + output[0].length
    mappedText += `<a href=${output.groups.link}>${output.groups.name}</a>`
  }
  mappedText += text.slice(i)

  return mappedText;
}
