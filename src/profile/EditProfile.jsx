import React, { useContext, useState } from 'react'
import {Button} from "@mui/material"
import { authContext } from '../context/Auth.context'
import { updateProfile } from 'firebase/auth'
import { storage } from '../utils/firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidV4 } from 'uuid'
import { useNavigate, useNavigation } from 'react-router-dom'

function EditProfile() {
    const {currentUser} = useContext(authContext)
    const [profileImage, setProfileImage] = useState('')
    const navigate = useNavigate()
    // const [userName, setUserName] = useState(currentUser.displayName)
    const formStyle={
        width: '500px',
        margin: '20px auto'
    }

    const bucketRef = ref(storage, `images/${ uuidV4() + profileImage.name}`)
    

    const handleSubmit = (e)=>{
        
        e.preventDefault()

        uploadBytes(bucketRef, profileImage)
        .then(snapshot => {
            getDownloadURL(snapshot.ref)
            .then((url)=>{
                updateProfile(currentUser, {
                    photoURL: url
                }).then(()=>{
                    console.log("Success");
                    navigate('/profile')
                }).catch(err=>{
                    console.log(err.message);
                })
            })
            .catch(err=>{
                console.log(err.message);
            })
            // console.log(res);
            navigate('/profile')
        }).catch(err => {
            console.log(err.message);
            
        })
        // updateProfile()
        // console.log(profileImage.name);
    }

    const handleChange = (e)=>{
        // console.log(e.target.files[0]);
        
        // setUserName(e.target.value)
        setProfileImage(e.target.files[0])
    }

  return (
    <>
        <form onSubmit={handleSubmit} style={formStyle}>
            
            <label htmlFor="image">Select an image : </label>
            <input onChange={handleChange} style={{width: '100%'}} id="image" name="profileImage" accept="image/8" type="file" />
            <br />
            {/* <label style={{marginTop: '8px'}} htmlFor="displayName">User Name:</label>
            <input onChange={handleChange}  value={userName} style={{width: '100%', outline: 'none', padding: '5px 8px', boder: '0.5px solid gray'}} name="displayName" /> */}
            <Button type="submit" variant="contained" sx={{marginTop: '8px'}}  >Submit</Button>
        
        </form>
    </>
  )
}

export default EditProfile