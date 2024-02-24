"use client"
import { Box, Drawer, ListItem, ListItemButton, ListItemText, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { DrawerItem } from "../styles";
export default function Layout({children}){
    const{user} = useContext(AppContext)
    const route = useRouter()

    useEffect(()=>{
        if(!user.isLoggedIn){
            route.push("/")
        }
    }, [ ])
    return( user.isLoggedIn?
        <div >
        <Drawer
        variant="permanent"
        PaperProps={{
            sx: {
              backgroundColor: "rgb(138, 206, 255)",
              color:"white",
              width:160
            }
          }}
        anchor="left"
        open={false}
        >
            <p style={{alignSelf:"center", color:"black"}}>Hello, {user.name}</p>
            <DrawerItem color="rgb(181, 90, 11)" onClick={()=>route.push("/dashboard")}>
               Dashboard
            </DrawerItem>
            <DrawerItem color="rgb(181, 90, 11)" onClick={()=>route.push("/dashboard/suggest")}>
                Feedback
            </DrawerItem>
            <DrawerItem color="rgb(145, 18, 3)" onClick={()=>route.push("/")}>
                Logout
            </DrawerItem>
            {user.auth && <DrawerItem color="darkGreen" onClick={()=>route.push("/dashboard/auth")}>
                Auth
            </DrawerItem>}

        </Drawer>
        <div style={{marginLeft:170, minHeight:'100vh', marginTop:0}}>
       {children}
 </div>
        </div>
        :
        <>
        Redirecting you to the homepage...
        </>
    )
}