import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authContext } from '../context/Auth.context'

function PublicRoutes({children}) {
    const location = useLocation()
    const currentUser = useContext(authContext)
    console.log(location.state);
    const loadComp = currentUser ? (
        <Navigate to={location.state?.from ? location.state.from : '/profile'} />
    ): children
    return(
        <div>
            {
                loadComp
            }
        </div>
    )
}

export default PublicRoutes