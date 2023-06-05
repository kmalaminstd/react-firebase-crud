import React, { useContext } from 'react'
import { NoteContext } from '../context/Note.context'
import Note from './Note';
import { Grid, Container } from '@mui/material';

function Notes() {
  const {note} = useContext(NoteContext)
  // console.log(note);
  return (
    <>
    <Container sx={{mt: 2}}>

      <Grid container spacing={2}>
        {
          note &&
          note.map((note, i) => (
            <Grid item sm={4} md={4} key={i}>
              <Note note={note} />
            </Grid>
          ))
        }
      </Grid>
    </Container>
    </>
  )
}

export default Notes