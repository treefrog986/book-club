"use client"
import { AppContext } from "@/app/context"
import { getComments } from "@/app/lib/server"
import Grid from "@mui/system/Unstable_Grid/Grid"
import { useContext, useEffect, useState } from "react"


export default function Auth(){
    const {user} = useContext(AppContext)
    const [comments, setComments] = useState([])
    useEffect(()=>{
        const a= async()=>{
            const res = await getComments()
            console.log(res)
            setComments(res)
        }
        a()
    }, [])
    return( user.auth? <>
    <p>Comments</p>
    <Grid container>
        {comments.map(comment=>
            <Grid key={comment.comment_id} item xs={4}>
                <p>{comment.comment}</p>
                <p>{comment.name}</p>
                </Grid>
            )}
    </Grid>
    </>:
    <>
    Not Authorized
    </>
    )
}