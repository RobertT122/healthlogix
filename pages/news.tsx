// multipage newsfeed component;
import NewsFeed from "../components/NewsFeed"
import { uploadPost } from "../lib/firebase"
import { TextField, Button, TextareaAutosize, Typography, Container, Box, Divider} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from "react";


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
    console.log(post)
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



  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)} className='posts-form'>
        <TextField label='Title' onChange={(e) => updatePost('title', e.currentTarget.value)}/>
        <TextareaAutosize 
          placeholder="Create a new post!"
          style={{width: "100%", minHeight: 200}}
          onChange={(e) => updatePost('body', e.currentTarget.value)}
        />
        <Box sx={{justifyContent: 'center', display: 'flex'}}> 
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
