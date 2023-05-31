import React from 'react'
import { authContext } from './context/Auth.context' 
import { useContext } from 'react';

function Profile() {
  const currentUser = useContext(authContext)
  console.log(currentUser);
  return (
    <>
      <pre>
        {JSON.stringify(currentUser, null, 2)}
      </pre>
    </>
  )
}

export default Profile