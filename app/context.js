'use client'
import { createContext, useContext, useState } from "react"

export const AppContext = createContext()

export const AppContextProvider= ({children})=>{
    const [user, setUser] = useState({isLoggedIn:false})
    return(
        <AppContext.Provider value={{user, setUser}}>
            {children}
        </AppContext.Provider>
    )

    }

    