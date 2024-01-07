'use client'
import { createContext, useContext, useState } from "react"

export const AppContext = createContext()

export const AppContextProvider= ({children})=>{
    const [data, setData] = useState({isLoggedIn:false})
    return(
        <AppContext.Provider value={{data, setData}}>
            {children}
        </AppContext.Provider>
    )

    }

    