import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';;
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as Navigator, useNavigate,  useLocation, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from './utils/firebase.config';

function ResetPassword() {
  const [params] = useSearchParams()
  const location = useLocation()
  const [userInfo, setUserInfo] = React.useState({
    'password': '',
  })
  const [snackBarOpen, setSnackBarOpen] = React.useState(false)
  const navigate = useNavigate()

  const {password} = userInfo

  const handleChange = (e)=>{
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const user = await confirmPasswordReset(auth, params.get('oobCode'), password)
      navigate( location?.state?.from || '/profile')
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
            New Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="password"
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
              Reset
            </Button>
            
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default ResetPassword