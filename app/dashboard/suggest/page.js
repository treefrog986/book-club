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
        setSending(true)
        await sendComment(comment, user.id)
        setSending(false)
        setSucces(true)
    }
    return(<div style={{display:"flex",justifyContent:"center"}}>
        <Stack>
    <p>Suggestion</p>
    <TextField
    value = {comment}
    onChange={e=>setComment(e.target.value)}
    multiline
    rows={5}
    />
    <Button disabled={sending} onClick={send} >Send Comment</Button>
    {success&&
    <Alert severity="success">Your comment was submitted</Alert>}
    </Stack>
    </div>)
}