/* HomePage component
contains the splash page with information and images 
constains the newsfeed component constrained to the 5 most recent postes
*/
import NewsFeed from "../components/NewsFeed";
import {
  Container,
  Box,
  Typography,
  Card,
  Divider,
  CardMedia,
} from "@mui/material";
import { mainContent } from "../lib/basicInfo";
import { properToCamel } from "../lib/helper";

export default function HomePage() {
  return (
    <Container
      sx={{
        justifyContent: "center",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <Card variant="outlined" sx={{ m: "auto" }}>
        <CardMedia component="img" image={mainContent.home.image} />
        <Box sx={{ padding: 2 }}>
          <Typography variant="h3">Hello world</Typography>
          <Divider />
          <Box sx={{ p: "10px" }}>
            <Typography variant="h6" sx={{ whiteSpace: "pre-wrap" }}>
              {mainContent.home.text}
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card sx={{ mt: 4 }}>
        <Box>
          <Typography align="center" variant="h4" sx={{ p: 2 }}>
            News Feed
          </Typography>
          <Divider sx={{ mx: 3 }} />
          <NewsFeed update={false} count={3} refresh={{}} defaultActive={0}/>
        </Box>
      </Card>
    </Container>
  );
}
