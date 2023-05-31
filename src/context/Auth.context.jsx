import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
 
export const authContext = createContext()

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(()=>{
        return onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user)
        })
    },[])


    return(
        <authContext.Provider value={currentUser}>
            {children}
        </authContext.Provider>
    )
}