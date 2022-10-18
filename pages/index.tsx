/* HomePage component
contains the splash page with information and images 
constains the newsfeed component constrained to the 5 most recent postes
*/
import NewsFeed from "../components/NewsFeed"
import { Container, Box, Typography, Card, Divider, autocompleteClasses} from "@mui/material"
import zIndex from "@mui/material/styles/zIndex"


export default function HomePage() {
  return (
    <Container sx={{
      justifyContent: "center",
      flexDirection: "column",
      padding: 0
    }}>
      <Box sx={{width: 1}}>
        <Card variant='elevation' sx={{p: 1, position: 'absolute', m: 2 }} className="coverCard">
          <Typography variant="h3" className="coverText">
            Hello World
          </Typography>
          <Divider sx={{px: 2}}/>
          <Box sx={{p: "10px"}}>
            <Typography variant="subtitle2" className="coverText">
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly
            </Typography>
          </Box>
        </Card>
        <img src="images/holisticmedicine.jpg" className="coverImage"/>
      </Box>
      <Card sx={{m: "auto", p: "10px"}}>
        <Typography variant="h2" >
          Hello World
        </Typography>
        <Divider />
        <Box sx={{p: "10px"}}>
          <Typography variant="h6" >
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design. Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets.[1] Lorem ipsum was introduced to the digital world in the mid-1980s, when Aldus employed it in graphic and word-processing templates for its desktop publishing program PageMaker. Other popular word processors, including Pages and Microsoft Word, have since adopted Lorem ipsum,[2] as have many LaTeX packages,[3][4][5] web content managers such as Joomla! and WordPress, and CSS libraries such as Semantic UI
          </Typography>
        </Box>
      </Card>


      <NewsFeed count={5} refresh={false}/>
    </Container>
  )
}
