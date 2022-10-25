import { Card, Container, Divider, TextareaAutosize, TextField, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";
import { jobs } from "../../lib/basicInfo";
import { dashedToCamel, properToCamel } from "../../lib/helper";
import { uploadApplication } from "../../lib/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../lib/context";
import { SettingsApplicationsOutlined } from "@mui/icons-material";

const emptyJob = {
  title: "",
  description: "",
  requirements: [],
};

export default function JobPage() {
  
  const router = useRouter();
  const { jobSlug } = router.query;
  let job = emptyJob;
  jobSlug && (job = jobs[dashedToCamel(jobSlug)]);

  return (
    <Container>
      <Card sx={{p: 3}}>
        <Typography variant="h4" align="center">
          {job.title}
        </Typography>
        <Divider/>
        <Typography variant="h6" sx={{whiteSpace: "pre-wrap"}}>
          {job.description}
        </Typography>
        <br />
        <Typography variant="h6">
          Requirements:
          <ul>
            {job.requirements.map(req => <li>{req}</li>)}
          </ul>
        </Typography>
      </Card>
      <br />
      <Card sx={{p: 3}}>
        <ApplicationForm jid={properToCamel(job.title)}/>
      </Card>
    </Container>
  );
}

function ApplicationForm({jid}){
  const [application, setApplication] = useState({name: '', phoneNumber: '', email:'', linkedIn: '', resume: '', coverLetter: '', jid});
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    setComplete(false)
    application.name && application.phoneNumber && application.email && application.resume && setComplete(true)
  }, [application])
  return(
    <>
    
    {
      submitted ? (
        <Typography align="center" variant="h6" color="secondary" sx={{my: 15}}> Your application has been recieved Thank You! </Typography>
        ) : (
        <form onSubmit={(e) => {
          e.preventDefault()
          uploadApplication(application).then(() => {
            setSubmitted(true)
          })
        }}>
          <Typography variant="h5" align="center">Application</Typography>
          <Divider sx={{m:1}} />
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <TextField
            sx={{m:1}}
              label="Name"
              variant="outlined"
              color="secondary"
              onChange={(e) =>
                setApplication(
                  Object.assign({}, application, { name: e.currentTarget.value })
                  )
                }
                />
            <TextField
            sx={{m:1}}
            label="Phone Number"
            variant="outlined"
            color="secondary"
            onChange={(e) =>
                setApplication(
                  Object.assign({}, application, { phoneNumber: e.currentTarget.value })
                  )
                }
                />
            <TextField
            sx={{m:1}}
            label="Email"
            variant="outlined"
            color="secondary"
            onChange={(e) =>
              setApplication(
                Object.assign({}, application, { email: e.currentTarget.value })
                )
              }
              />
            <TextField
            sx={{m:1}}
            label="LinkedIn url"
            variant="outlined"
            color="secondary"
            onChange={(e) =>
              setApplication(
                Object.assign({}, application, { linkedIn: e.currentTarget.value })
                )
              }
              />
            <Box sx={{display: 'flex', flexDirection: 'column', m:1}}>
              <Typography color="gray" sx={{p: 2}}>Resume:</Typography>
              <TextareaAutosize 
                style={{ width: "100%", minHeight: 200 }}
                onChange={(e) =>
                  setApplication(
                    Object.assign({}, application, { resume: e.currentTarget.value })
                    )
                  }
                  />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', m:1}}>
              <Typography color="gray" sx={{p: 2}}>Cover Letter (optional):</Typography>
              <TextareaAutosize 
                style={{ width: "100%", minHeight: 200 }}
                onChange={(e) =>
                  setApplication(
                    Object.assign({}, application, { linkedIn: e.currentTarget.value })
                    )
                  }
                  />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', m:2}}>
            <Button color="secondary" variant="contained" type="submit" disabled={!complete}>
              Submit
            </Button>
            </Box>
          </Box>
        </form>  
        )
    }
    </>
  )
}
