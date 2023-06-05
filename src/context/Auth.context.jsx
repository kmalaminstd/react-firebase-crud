import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase.config";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import '../utils/firebase.config'
 
export const authContext = createContext()

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null)
    const [loader, setLoader] = useState(false)

    useEffect(()=>{
        return onAuthStateChanged(auth, (user)=>{
            if(!user){
                setLoader(true)
                setCurrentUser(null)
            }else{
                setLoader(true)
                setCurrentUser(user)
            }
        })
    },[])

    // useEffect(()=>{
    //     if(currentUser){
    //         updateProfile(currentUser, {
    //             displayName: 'Al-amin'
    //         })
    //     }
    // },[])

    let seconderyDisplayName = '';

    if(currentUser && !currentUser.displayName){
        for(let i = 0; i < currentUser.email.length; i++){
            if(currentUser.email[i] === '@'){
                break
            }
            seconderyDisplayName += currentUser.email[i]
            // console.log(currentUser.email[i]);
        }
        // console.log(nName); 
        // updateProfile
    }

    useEffect(()=>{
        if(currentUser){
            (async()=>{
                try{
                    const res = await updateProfile(currentUser, {
                        displayName: seconderyDisplayName
                    })
                    // console.log(res);
                }catch(err){
                    console.log(err.message);
                }
            })()
        }
    },[])


    const value = {
        currentUser,
        loader,

    }

    return(
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}