// multipage newsfeed component;
import { useMemo, useState } from "react";
import NewsFeed from "../components/NewsFeed"
import NewsFeedItem from "../components/NewsFeedItem";
import { uploadPost } from "../lib/firebase"
import { TextField, Button, TextareaAutosize, Typography, Container, Box, Divider, IconButton} from "@mui/material";

import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';


export default function NewsPage() {
  const [refresh, setRefresh] = useState({})

  return (
    <>
      <NewsPostForm setRefresh={setRefresh}/>
      <Divider/>
      <NewsFeed count={10} refresh={refresh}/>
    </>
  )
}

const NewsPostForm = function ({setRefresh}) {

  const [post, setPost] = useState({body: '', title: ''});
  const updatePost = (key, newValue) => {
    setPost(Object.assign({}, post, {[key]: newValue}))
  };

  const [image, setImage] = useState<File | undefined>()
  const [disabled, setDisabled] = useState(false)
  
  function handleSubmit(e) {
    setDisabled(true)
    e.preventDefault();
    uploadPost(Object.assign({image}, post)).then(()=>{
      setDisabled(false)
      setRefresh({})
    })
  }

  function handleTextAreaTabs(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      e.currentTarget.value += `\t`
      updatePost('body', e.currentTarget.value)
    }
  }
  const todaysDate = useMemo(()=> {return new Date()}, [])
  const tempPostUrl = useMemo(()=>{
    return image ? URL.createObjectURL(image) : "images/default-post-image.jpg" 
  }, [image])
  const tempPost = useMemo(() => {return Object.assign({}, post, {createdAt: todaysDate},{imageURL: tempPostUrl})}, [tempPostUrl, post])

  function ClearImage() {
    return(
      <IconButton onClick={(e)=>{
        e.preventDefault();
        setImage(undefined);
      }}>
        <ClearIcon />
      </IconButton>
    )
  }

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 1}}>
      <Typography variant='h4'>Create a New Post</Typography>
      <br />
      <NewsFeedItem post={tempPost}/>
      <br/><br/>
      <form onSubmit={(e) => handleSubmit(e)} className='posts-form'>
        <TextField label='Title' onChange={(e) => updatePost('title', e.currentTarget.value)}/>
        <TextareaAutosize 
          placeholder="Create a new post!"
          style={{width: "100%", minHeight: 200}}
          onChange={(e) => updatePost('body', e.currentTarget.value)}
          onKeyDown={(e) => handleTextAreaTabs(e)}
        />
        <Box sx={{justifyContent: 'center', display: 'flex'}}> 
          {image ? <ClearImage/> : <></> }
          <Button color='secondary' variant='outlined' sx={{p:0, my: 'auto', mx: 2}}>
            <label className="button-label">
              <FileUploadIcon /><Typography variant="subtitle1">Image</Typography>
              <input type="file" hidden onChange={(e) => {
                e.preventDefault()
                setImage(e.target.files[0])
              }}/>
            </label>
          </Button>
          <Button 
            color='secondary' 
            variant='contained' 
            type="submit" 
            sx={{my: 'auto', mx: 2}}
            hidden={disabled} 
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  )
}

