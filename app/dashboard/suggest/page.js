"use client"
import { AppContext } from "@/app/context";
import { sendComment } from "@/app/lib/server";
import { Alert, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext, useState } from "react";


export default function Suggest(){
    const [comment, setComment] = useState("")
    const {user} = useContext(AppContext)
    const [sending, setSending] = useState(false)
    const [success, setSucces] = useState(false)
    const send = async ()=>{
        setSucces(false)
        setSending(true)
        await sendComment(comment, user.id)
        setComment("")
        setSending(false)
        setSucces(true)
    }
    return(<div style={{display:"flex",justifyContent:"center"}}>
        <Stack>
    <p>Feedback</p>
    <TextField
    sx={{width:500}}
    value = {comment}
    onChange={e=>setComment(e.target.value)}
    multiline
    rows={5}
    />
    <Button 
    sx={{
        backgroundColor:"blue",
        color:"white",
        borderRadius:5,
        width:300,
        alignSelf:"center",
        marginTop:5
    }}
     disabled={sending} 
     onClick={send} >Send Comment</Button>
    {success&&
    <Alert severity="success">Your comment was submitted</Alert>}
    </Stack>
    </div>)
}