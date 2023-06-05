import React, { useContext, useEffect, useState } from 'react'
import { Container, Box, Typography, TextField, Button } from '@mui/material'
import { noteColRef } from '../utils/firebase.config'
import { Timestamp, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore'
import { authContext } from '../context/Auth.context'
import { useNavigate, useParams } from 'react-router-dom'

function EditNote() {
  const navigate = useNavigate()
  const {id} = useParams()
  // console.log(id);
  const {currentUser} = useContext(authContext)
  const [noteText, setNoteText] = useState({
    noteTitle: '', 
    noteDesc: ''
  })

  useEffect(()=>{
    (async()=>{
      const docRef = doc(noteColRef, id)
      const currentNote = await getDoc(docRef)
      if(currentNote.exists){
        const data = currentNote.data()
        setNoteText({
          ...data
        })
      }
    })()
  },[id])


  const handleSubmit = async (e)=>{
    e.preventDefault()
    const docRef = doc(noteColRef, id)

    if(noteText.user.id === currentUser.uid){
      await updateDoc(docRef, {
        ...noteText
      })
      console.log('Note Update successfully');
      navigate('/notes')
    }else{
      console.log('Note have enough permission to edit the note');
      navigate('/notes')
    }
  }
  const handleChange =  (e)=>{
    setNoteText({
      ...noteText,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Container maxWidth="xs">
        <Typography component="h2" variant="h5" textAlign="center">
          Edit Note
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>

        <TextField value={noteText.noteTitle} onChange={handleChange} name="noteTitle" variant="filled" label="Note Title" fullWidth required />
        <TextField value={noteText.noteDesc} onChange={handleChange} name="noteDesc" variant="filled" label="Description" rows="5" fullWidth required multiline />
        <Button color="primary" variant="contained" type="submit" fullWidth>UPDATE</Button>
        </Box>
      </Container>
    </>
  )
}

export default EditNote