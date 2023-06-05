import React from 'react'
import { authContext } from './context/Auth.context' 
import { useContext } from 'react';
import ProfileCard from './profile/ProfileCard';

function Profile() {
  const currentUser = useContext(authContext)
  // console.log(JSON.stringify(currentUser, null, 2));
  return (
    <>
      <ProfileCard />

      {/* <pre>
        {JSON.stringify(currentUser, null, 2)}
      </pre> */}
    </>
  )
}

export default Profile