/* HomePage component
contains the splash page with information and images 
constains the newsfeed component constrained to the 5 most recent postes
*/
import NewsFeed from "../components/NewsFeed"
import { Container, Box, Typography, Card, Divider, CardMedia} from "@mui/material"
import zIndex from "@mui/material/styles/zIndex"


export default function HomePage() {
  return (
    <Container sx={{
      justifyContent: "center",
      flexDirection: "column",
      padding: 0
    }}>
      <Card variant='outlined' sx={{m: "auto"}}>
        <CardMedia 
          component="img"
          image="images/holisticmedicine.jpg"
        />
        <Box sx={{padding: 2}}>
          <Typography variant="h3" >
            Hello World
          </Typography>
          <Divider />
          <Box sx={{p: "10px"}}>
            <Typography variant="h6" sx={{whiteSpace: 'pre-wrap'}}>
{`Lorem ipsum dolor sit amet. Ut odio vero vel recusandae architecto et doloribus molestiae nam itaque adipisci est fugiat placeat. Non quia cumque qui laborum quod ut fugiat tempore.

Qui autem nihil et rerum harum ea galisum harum in autem praesentium et tempora ipsa. Id optio voluptatibus est corporis repellat aut commodi ipsa eos tempora fuga. Qui laborum earum aut dolorem dolores ab omnis rerum aut perspiciatis tenetur! Sit galisum galisum id ipsa quas ut laudantium magni aut iste quaerat id officia non itaque natus.

Qui laboriosam enim eos fuga harum et blanditiis nulla qui perferendis iure deserunt cupiditate cum repellendus quae. Aut Quis optio ab numquam sapiente aut voluptate exercitationem in excepturi voluptates ut neque quibusdam et dolor repellendus ut optio dolorum.`}
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card sx={{mt: 4}}>
        <Box>
          <Typography align="center" variant="h4" sx={{p: 2}}>News Feed</Typography>
          <Divider sx={{mx: 3}}/>
          <NewsFeed update={false} count={3} refresh={{}}/>
        </Box>
      </Card>
    </Container>
  )
}
