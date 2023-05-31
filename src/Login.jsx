import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Copyright } from '@mui/icons-material';
import { Link as Navigator, useNavigate,  useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider ,signInWithPopup } from 'firebase/auth';

import { auth } from './utils/firebase.config';

function Login() {
  const location = useLocation()
  const [userInfo, setUserInfo] = React.useState({
    'email': '',
    'password': ''
  })
  const [snackBarOpen, setSnackBarOpen] = React.useState(false)
  const navigate = useNavigate()
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const {email, password} = userInfo

  const handleChange = (e)=>{
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const user = await signInWithEmailAndPassword(auth, email, password)
      navigate( location?.state?.from || '/profile')
    }catch(err){
      console.log(err.message);
    }
  }

  // google sign in function
  const googleSignIn = async ()=>{
    try{
      await signInWithPopup(auth, googleProvider)
      console.log("google sign in successfull");
    }catch(err){
      console.log(err.message);
    }
  }
  // facebook sign in function
  const facebookSignIn = async()=>{
    try{
      await signInWithPopup(auth, facebookProvider)
      console.log('Facebook sign in');
    }catch(err){
      console.log(err.message);
    }
  }
  // github sign in
  const githubSignIn = async ()=>{
    try{
      const res = await signInWithPopup(auth, githubProvider)
      console.log('Github Sign in', res);
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={userInfo.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={userInfo.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" component={Navigator} to="/forgot-password" variant="body2">
                  Forgort Password? Reset Password.
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Button
              type="submit"
              fullWidth
              onClick={googleSignIn}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Google Sign In
            </Button>

            <Button
              type="submit"
              fullWidth
              onClick={facebookSignIn}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Facebook Sign In
            </Button>

            <Button
              type="submit"
              fullWidth
              onClick={githubSignIn}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Github Sign In
            </Button>
        </Box>
      </Container>
    </>
  )
}

export default Login