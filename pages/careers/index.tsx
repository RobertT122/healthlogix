import {
  Card,
  Container,
  Divider,
  Grid,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

/* Splash Page
Contains:
* mission statement for healthlogix,
  advantages of employment and work culture,
* a list of available job oportunities that link to the jobs page
*/
import { jobs } from "../../lib/basicInfo";
import { mainContent } from "../../lib/basicInfo";
import { camelToDashed } from "../../lib/helper";

export default function CareersHomePage() {
  return (
    <Container>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
          Careers
        </Typography>
        <CardMedia component="img" image={mainContent.career.image} />
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" whiteSpace="pre-wrap">
          {mainContent.career.text}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Grid container justifyContent="center" spacing={2}>
          {Object.keys(jobs).map((key) => {
            let job = jobs[key];
            return (
              <Grid item key={key} className="button-label">
                <Link href={`/careers/${camelToDashed(key)}`}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Box
                      sx={{
                        width: 250,
                        height: 200,
                        maskImage:
                          "linear-gradient(to bottom, black 50%, transparent 100%)",
                      }}
                    >
                      <Typography variant="h6" align="center">
                        {job.title}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle1">
                        {job.description}
                      </Typography>
                    </Box>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Card>
    </Container>
  );
}
