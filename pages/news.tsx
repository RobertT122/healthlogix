// multipage newsfeed component;
import NewsFeed from "../components/NewsFeed"
import { uploadPost } from "../lib/firebase"
import { TextField, Button, TextareaAutosize, Typography} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from "react";


export default function NewsPage() {
  const [refresh, setRefresh] = useState(true)

  return (
    <>
      <NewsFeed count={10} refresh={refresh}/>
      <NewsPostForm setRefresh={setRefresh}/>
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
      setRefresh(true)
    })
  }



  return (
    <form onSubmit={(e) => handleSubmit(e)} className='posts-form'>
      <TextField label='Title'  onChange={(e) => updatePost('title', e.currentTarget.value)}/>
      <br />
      <TextareaAutosize placeholder="Create a new post!" onChange={(e) => updatePost('body', e.currentTarget.value)}/>
      <br />
      <Button color='secondary' variant='outlined' sx={{p:0}}>
        <label className="button-label">
          <FileUploadIcon sx={{}}/><Typography>Select Image</Typography>
          <input type="file" hidden onChange={(e) => {
            e.preventDefault()
            setImage(e.target.files[0])
          }}/>
        </label>
      </Button>
      <br />

      <Button color='secondary' variant='contained' type="submit" hidden={disabled}>Submit</Button>
    </form>
  )
}
