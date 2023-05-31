import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authContext } from '../context/Auth.context'

function PrivateRoutes({children}) {
    const location = useLocation()
    const currentUser = useContext(authContext) 
    const loadComp = currentUser ? (children) : <Navigate to="/login" state={{from: location.pathname}} />
    return(
        <div>
            {loadComp}
        </div>
    )
}

export default PrivateRoutes