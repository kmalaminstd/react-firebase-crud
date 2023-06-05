import { Avatar, Card, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography, Grid, Menu, MenuItem } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { authContext } from '../context/Auth.context';
import { doc, deleteDoc } from 'firebase/firestore';
import { noteColRef } from '../utils/firebase.config';

function Note({note}) {
  const {currentUser} = useContext(authContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const checkOwnerShip = currentUser.uid === note.user.id


  // console.log(note);note.id

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    // console.log(e.currentTarget);
    setAnchorEl(e.currentTarget);
  };

  const handleDelete = async ()=>{
    const docRef = doc(noteColRef, note.id)
    try{
      if(checkOwnerShip){
        await deleteDoc(docRef)  
        console.log('Delete note successfully');
      }
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <>
    
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {/* { 
                note &&
                console.log(note)
              } */}
              {
                note.user.displayName ?
                note?.user?.displayName[0].toUpperCase() : 'A'
              }
            </Avatar>
          }
          action={
            checkOwnerShip ? (
              <IconButton onClick={handleClick} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            ) : null
          }
          title={note.user?.displayName}
          subheader={note.createdAt.toDate().toLocaleDateString()}
        ></CardHeader>

        <CardContent>
          <Menu
            onClose={handleClose}
            onClick={handleClose}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem component={Link} to={`edit-note/${note.id}`}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
          <Typography variant="h5" color="text.primary">
            {note.noteTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {note.noteDesc}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default Note