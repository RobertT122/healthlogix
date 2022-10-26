import { useState, useMemo } from "react";
import { uploadPost } from "../lib/firebase";
import NewsFeedItem from "./NewsFeedItem";
import {
  IconButton,
  Card,
  Typography,
  TextField,
  TextareaAutosize,
  Box,
  Button,
} from "@mui/material";

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ClearIcon from "@mui/icons-material/Clear";

export default function NewsPostForm({ setRefresh, toggleForm }) {
  const [previewActive, setPreviewActive] = useState(false);
  const togglePreview = () => setPreviewActive(!previewActive);

  const [post, setPost] = useState({ body: "", title: "" });
  const updatePost = (key, newValue) => {
    setPost(Object.assign({}, post, { [key]: newValue }));
  };

  const [image, setImage] = useState<File | undefined>();
  const [disabled, setDisabled] = useState(false);

  function handleSubmit(e) {
    setDisabled(true);
    e.preventDefault();
    uploadPost(Object.assign({ image }, post)).then(() => {
      toggleForm();
      setRefresh({});
    });
  }

  function handleTextAreaTabs(e) {
    if (e.key == "Tab") {
      e.preventDefault();
      e.currentTarget.value += `\t`;
      updatePost("body", e.currentTarget.value);
    }
  }

  const todaysDate = useMemo(() => {
    return new Date();
  }, []);

  const tempPostUrl = useMemo(() => {
    return image ? URL.createObjectURL(image) : "images/default-post-image.jpg";
  }, [image]);

  const tempPost = useMemo(() => {
    return Object.assign(
      {},
      post,
      { createdAt: todaysDate },
      { imageURL: tempPostUrl }
    );
  }, [tempPostUrl, post]);

  function ClearImage() {
    return (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          setImage(undefined);
        }}
      >
        <ClearIcon />
      </IconButton>
    );
  }

  return (
 
    <form onSubmit={(e) => handleSubmit(e)} className="posts-form">
      <Box sx={{display: "flex", flexDirection: "row-reverse"}}>
        <IconButton color="error" onClick={toggleForm} >
          <CancelPresentationIcon fontSize="large"/>
        </IconButton >
      </Box>
      <Typography variant="h4" align="center">
        Create a New Post
      </Typography>
      <br />
      <NewsFeedItem
        post={tempPost}
        index={0}
        active={previewActive}
        toggleActive={togglePreview}
      />
      <br />
      <br />
      <TextField
        color="secondary"
        label="Title"
        onChange={(e) => updatePost("title", e.currentTarget.value)}
      />
      <TextareaAutosize
        placeholder="Create a new post!"
        style={{ width: "100%", minHeight: 200 }}
        onChange={(e) => updatePost("body", e.currentTarget.value)}
        onKeyDown={(e) => handleTextAreaTabs(e)}
      />
      <Box sx={{ mx: "auto" }}>
        <Typography variant="subtitle1" color="gray">
          * Add a Link: [name of link](https://www.example.com)
        </Typography>
      </Box>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        {image ? <ClearImage /> : <></>}
        <Button
          color="secondary"
          variant="outlined"
          sx={{ p: 0, my: "auto", mx: 2 }}
        >
          <label className="button-label">
            <FileUploadIcon />
            <Typography variant="subtitle1">Image</Typography>
            <input
              type="file"
              hidden
              onChange={(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
            />
          </label>
        </Button>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          sx={{ my: "auto", mx: 2 }}
          hidden={disabled}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
}
