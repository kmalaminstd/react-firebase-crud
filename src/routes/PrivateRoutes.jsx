import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authContext } from '../context/Auth.context'

function PrivateRoutes({children}) {
    // const [loader, setLoader] = useState(false)
    const location = useLocation()
    const {currentUser, loader} = useContext(authContext) 
    let loadComp; 

    if(loader){
        loadComp = currentUser ? (children) : <Navigate to="/login" state={{from: location.pathname}} />
    }else{
        return 'Loading...'
    }

    return(
        <div>
            {loadComp}
        </div>
    )
}

export default PrivateRoutes