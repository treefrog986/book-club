"use client"
import { Box, Drawer, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../context";


export default function Layout({children}){
    const{data} = useContext(AppContext)
    const route = useRouter()
    const drawerWith = 300
    return( data.isLoggedIn?
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

        </Drawer>
        <div style={{marginLeft:150}}>
       {children}
 </div>
        </div>
        :
        <div>
           {children}
        </div>
    )
}