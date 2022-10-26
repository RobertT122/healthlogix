// multipage newsfeed component;
import { useState, useContext } from "react";
import { UserContext } from "../lib/context";
import NewsFeed from "../components/NewsFeed";
import NewsPostForm from "../components/NewsPostForm";
import { Typography, Container, Divider, Card, Button } from "@mui/material";


export default function NewsPage() {
  const [refresh, setRefresh] = useState({});
  const [formVisible, setFormVisible] = useState(false);
  const toggleForm = () => setFormVisible(!formVisible);

  const user = useContext(UserContext);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 1,
      }}
    >
      {!user.isAdmin ? ( <></> ) : (<AdminContent setRefresh={setRefresh} toggle={toggleForm} visible={formVisible}/>)}
      <Card variant="outlined" sx={{ width: 1, px: 5, pb: 10, pt: 3, mb: 4 }}>
        <Typography variant="h4" align="center">
          News Feed
        </Typography>
        <Divider sx={{ width: 1 }} />
        <NewsFeed count={10} refresh={refresh} update={true} defaultActive={-1}/>
      </Card>
    </Container>
  );
}

function AdminContent ({setRefresh, toggle, visible}){
  return(
    !visible ? (
      <Card sx={{mb: 1, backgroundColor: "rgb(101, 230, 131)", width: "100%"}}>
      <Button sx={{width: "100%", py: 3}} onClick={toggle}>
        <Typography>Create a new Post</Typography>
      </Button>
      </Card>
    ) : (
      <Card variant="outlined" sx={{ px: 10, pb: 10, pt: 1, mb: 4 }}>
        <NewsPostForm setRefresh={setRefresh} toggleForm={toggle} />
      </Card>
    )
  )
}

