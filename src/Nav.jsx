import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from './utils/firebase.config';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { authContext } from './context/Auth.context';

function Nav() {
  const navigate = useNavigate()
  const currentUser = useContext(authContext)
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Firebase Authentication
            </Typography>
            {
              !currentUser &&
              (
                <>
                  <Button component={NavLink} to="/login" color="inherit">Login</Button>
                  <Button component={NavLink} to="register" color="inherit">Register</Button>
                </>
              )
            }
            {
              currentUser &&
              (
                <>
                  <Button component={NavLink} to="profile" color="inherit">Profile</Button>
                  <Button component={NavLink} color="inherit" >Private</Button>
                  <Button onClick={()=> {
                    signOut(auth) 
                    navigate('/login') 
                    }} color="inherit" >Log Out</Button>
                </>
              )
            }
            </Toolbar>
        </AppBar>
        </Box>
    </>
  )
}

export default Nav