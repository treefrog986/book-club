"use client"
import { Box, Drawer, ListItem, ListItemButton, ListItemText, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../context";

export default function Layout({children}){
    const{user} = useContext(AppContext)
    const route = useRouter()
    const drawerWith = 300
    return( user.isLoggedIn?
        <div>
        <Drawer
        variant="permanent"
        anchor="left"
        open={false}
        >
            <ListItem>
                <ListItemButton
                sx={{
                    backgroundColor:"red",
                    borderColor:"red",
                    color:'white',
                    borderStyle:"solid",
                    borderWidth:"1px",
                    "&:hover":{
                        backgroundColor:"white",
                        color:"red",
                        
                    }
                }}
                onClick={()=>route.push("/dashboard")}>
                <ListItemText>
                    Dashboard
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                sx={{
                    backgroundColor:"orange",
                    borderColor:"orange",
                    color:'white',
                    borderStyle:"solid",
                    borderWidth:"1px",
                    "&:hover":{
                        backgroundColor:"white",
                        color:"orange",
                    }
                }}
                onClick={()=>route.push("/dashboard/suggest")}>
                <ListItemText>
                    Suggestions
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                sx={{
                    backgroundColor:"green",
                    borderColor:"green",
                    color:'white',
                    borderStyle:"solid",
                    borderWidth:"1px",
                    "&:hover":{
                        backgroundColor:"white",
                        color:"green",
                    }
                }}
                onClick={()=>route.push("/")}>
                <ListItemText>
                    Log Out
                </ListItemText>
                </ListItemButton>
            </ListItem>
            {user.auth && <ListItem>
                <ListItemButton
                sx={{
                    backgroundColor:"blue",
                    borderColor:"blue",
                    color:'white',
                    borderStyle:"solid",
                    borderWidth:"1px",
                    "&:hover":{
                        backgroundColor:"white",
                        color:"blue",
                    }
                }}
                onClick={()=>route.push("/dashboard/auth")}>
                <ListItemText>
                    Auth
                </ListItemText>
                </ListItemButton>
            </ListItem>}

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