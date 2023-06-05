import React, { useContext, useState } from 'react'
import { Container, Box, Typography, TextField, Button } from '@mui/material'
import { noteColRef } from '../utils/firebase.config'
import { Timestamp, addDoc } from 'firebase/firestore'
import { authContext } from '../context/Auth.context'
import { useNavigate } from 'react-router-dom'


function AddNote() {
  const navigate = useNavigate()
  const {currentUser} = useContext(authContext)
  const [noteText, setNoteText] = useState({
    noteTitle: '', 
    noteDesc: ''
  })


  const handleSubmit = (e)=>{
    e.preventDefault()
    addDoc(noteColRef,{
      ...noteText,
      createdAt: Timestamp.fromDate(new Date()),
      user:{
        id: currentUser.uid,
        displayName: currentUser.displayName  
      },
    }).then(() => {
      console.log('Data added successfully');
    }).catch((err) => {
      console.log(err.message);
    })
  };

  const handleChange = (e)=>{
    setNoteText({
      ...noteText,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Container maxWidth="xs">
        <Typography component="h2" variant="h5" textAlign="center">
          Add a note
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>

        <TextField value={noteText.noteTitle} onChange={handleChange} name="noteTitle" variant="filled" label="Note Title" fullWidth required />
        <TextField value={noteText.noteDesc} onChange={handleChange} name="noteDesc" variant="filled" label="Description" rows="5" fullWidth required multiline />
        <Button color="primary" variant="contained" type="submit" fullWidth>Add</Button>
        </Box>
      </Container>
    </>
  )
}

export default AddNote