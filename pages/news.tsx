// multipage newsfeed component;
import NewsFeed from "../components/NewsFeed"
import { getPosts, uploadPost } from "../lib/firebase"
import { TextField } from "@mui/material";
import { useState } from "react";


export default function NewsPage() {
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
    uploadPost(Object.assign({image}, post)).then(()=>setDisabled(false))
  }
  return (

    <>
    <button onClick={(e)=>{
      e.preventDefault();
      getPosts(2).then(posts => console.log(posts))
    }}>
      get posts
    </button>

    <form onSubmit={(e) => handleSubmit(e)}>
      <TextField label='title' onChange={(e) => updatePost('title', e.currentTarget.value)}/>
      <TextField label='body' onChange={(e) => updatePost('body', e.currentTarget.value)}/>

      <label>
        
        <input type="file" hidden onChange={(e) => {
          e.preventDefault()
          setImage(e.target.files[0])
        }}/>
      </label>
      <button type="submit" hidden={disabled}>Submit</button>
    </form>
    </>
  )
}
