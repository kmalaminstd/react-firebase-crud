import { createContext, useEffect, useState } from "react";
import { noteColRef } from "../utils/firebase.config";
import {onSnapshot, getDoc, getDocs, doc} from 'firebase/firestore'

export const NoteContext = createContext()

export const NoteContextProvider = ({children})=>{

    const [note, setNote] = useState('')

    useEffect(()=>{
        const unsubscribe = onSnapshot(noteColRef, snapShots =>{
            const notes = snapShots.docs.map( elm => {
                return{
                    ...elm.data(),
                    id: elm.id
                }
            })
            setNote(notes)
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    // if(note){
    //     console.log(note);
    // }

    const value ={
        note
    }

    return(
         <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider> 
    )
}