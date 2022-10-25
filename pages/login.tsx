import { auth } from "../lib/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Typography, Container, Card, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState([]);
  const router = useRouter();

  function signIn(e) {
    let { email, password } = credentials;
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <Container>
      <Card>
        <form onSubmit={(e) => signIn(e)}>
          <Typography variant="h4">Login</Typography>
          <TextField
            label="email"
            variant="outlined"
            color="secondary"
            onChange={(e) =>
              setCredentials(
                Object.assign({}, credentials, { email: e.currentTarget.value })
              )
            }
          />
          <TextField
            label="password"
            variant="outlined"
            color="secondary"
            onChange={(e) =>
              setCredentials(
                Object.assign({}, credentials, {
                  password: e.currentTarget.value,
                })
              )
            }
          />
          <Button color="secondary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
        <Typography align="center" color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      </Card>
    </Container>
  );
}
