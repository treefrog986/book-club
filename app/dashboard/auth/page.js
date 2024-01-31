"use client"
import { AppContext } from "@/app/context"
import useLoad from "@/app/lib/loadComponent"
import { getComments } from "@/app/lib/server"
import { Paper } from "@mui/material"
import Grid from "@mui/system/Unstable_Grid/Grid"
import { useContext, useEffect, useState } from "react"


export default function Auth(){
    const {user} = useContext(AppContext)
    const [comments, setComments] = useState([])
    const [func, bool] = useLoad( async()=>{
        const res = await getComments()
        console.log(res)
        setComments(res)
    })
    useEffect(()=>{
        func()
    }, [])
    return( user.auth? 
    bool?<div>
    <p >Comments</p>
    <Grid container spacing={1}>
        {comments.map(comment=>
            <Grid key={comment.comment_id} item xs={4} >
                <Paper sx={{padding:1, borderRadius:5}} elevation={6}>
                <p style={{padding:0}}>{comment.comment}</p>
                <p>{comment.name}</p>
        </Paper>
                </Grid>
            )}
    </Grid>
    </div>:<p>Loading Comments</p>:
    <>
    Not Authorized
    </>
    )
}