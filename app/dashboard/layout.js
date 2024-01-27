"use client"
import { Box, Drawer, ListItem, ListItemButton, ListItemText, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../context";
import { DrawerItem } from "../styles";

export default function Layout({children}){
    const{user} = useContext(AppContext)
    const route = useRouter()
    return( user.isLoggedIn?
        <div>
        <Drawer
        variant="permanent"
        anchor="left"
        open={false}
        >
            <p style={{alignSelf:"center"}}>Hello, {user.name}</p>
            <DrawerItem color="red" onClick={()=>route.push("/dashboard")}>
               Dashboard
            </DrawerItem>
            <DrawerItem color="orange" onClick={()=>route.push("/dashboard/suggest")}>
                Feedback
            </DrawerItem>
            <DrawerItem color="green" onClick={()=>route.push("/")}>
                Logout
            </DrawerItem>
            {user.auth && <DrawerItem color="blue" onClick={()=>route.push("/dashboard/auth")}>
                Auth
            </DrawerItem>}

        </Drawer>
        <div style={{marginLeft:160}}>
       {children}
 </div>
        </div>
        :
        <>
        <p>You are not logged in</p>
         <Link href="/">Log Out</Link>
        
        </>
    )
}