import { Card, Container, CardMedia, Button, Typography, Grid } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../context/Auth.context";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";


const ProfileCard = () => {
    const navigate = useNavigate()
    const {currentUser} = useContext(authContext)

    const handleClick = ()=>{
        navigate('/update-profile')
    }

  return (
    <Container sx={{marginTop: '30px'}}>
        <Card variant="outlined" sx={{backgroundColor: 'rgb(231 235 240)', padding: '20px'}}>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <CardMedia
                        sx={{
                            width: '100%',
                            height: 'auto'
                        }}
                        
                        component="img"
                        image={currentUser.photoURL}
                    />
                    <Button variant="text" onClick={handleClick}  >Update Image</Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography component="h4" variant="h4">
                        Name: {currentUser.displayName}
                    </Typography>
                    <Typography component="h4" variant="p" sx={{marginTop: '20px'}}>
                        User Name : {currentUser.displayName}
                    </Typography>
                    <Typography component="h4" variant="p" sx={{marginTop: '10px'}}>
                        Email : {currentUser.email}
                    </Typography>
                    <Typography component="h4" variant="p" sx={{marginTop: '10px'}}>
                        Verified:  {String(currentUser.emailVerified)}
                    </Typography>
                </Grid>
            </Grid>

        </Card>
    </Container>
  )
    
};

export default ProfileCard;