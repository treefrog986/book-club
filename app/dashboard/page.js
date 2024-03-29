"use client"
import { useContext, useEffect, useState } from "react"
import { AppContext} from "../context"
import Link from "next/link"
import { createBook, getBooks } from "../lib/server"
import { Dialog, DialogContent, DialogTitle, TextField, Stack, Button, Grid, Alert} from "@mui/material"
import { useRouter } from "next/navigation"
import useLoad from "../lib/loadComponent"
import { AddBookButton, ViewBookButton } from "../styles"
import loadComponent from "./loadingSkel"
import { revalidatePath } from "next/cache"
export default function Dashboard(){
    const route = useRouter()
    const {user, setUser} = useContext(AppContext)
    const [func, bool] = useLoad(async()=>{const res = await getBooks(user.id)
      setUser(p=>({...p, books:res}))})
    const [newBookError, setNewBookError] = useState("")
    const [newBook, setNewBook] = useState({title:"", author:"", genre:"", totalpages:0})
    const [bookDialog, setBookDialog] = useState(false)
    useEffect(()=>{
      func()
    },[])
    
    useEffect(()=>{
      setNewBook({title:"", author:"", genre:"", totalpages:0})
      setNewBookError("")
    }, [bookDialog])
    const submitBook = async ()=>{
      setNewBookError("")
      if(newBook.totalpages<=0){
        setNewBookError("Total pages must be greater than 0")
        return 
      }
      await createBook(newBook, user.id)
      const res = await getBooks(user.id) 
      setUser(p=>({...p, books:res}))
      setBookDialog(false)
    }
    return(<>
     
        <>
        <Dialog
        open = {bookDialog}
        onClose={()=>setBookDialog(false)}
        maxWidth={"sm"}
        fullWidth
        >
          <DialogTitle>Create New book</DialogTitle>
          <DialogContent>
            <Stack direction={"column"}>
              <p>Title</p>
              <TextField
              value={newBook.title}
              onChange={e=>setNewBook(p=>({...p, title: e.target.value}))}
              />
              <p>Author</p>
              <TextField
              value={newBook.author}
              onChange={e=>setNewBook(p=>({...p, author: e.target.value}))}
              />
              <p>Genre</p>
              <TextField
              value={newBook.genre}
              onChange={e=>setNewBook(p=>({...p, genre: e.target.value}))}
              />
              <p>Total Pages</p>
              <TextField
              value={newBook.totalpages}
              onChange={e=>setNewBook(p=>({...p, totalpages: e.target.value}))}
              />
              <Button onClick={submitBook}>Submit</Button>
              {newBookError && <Alert severity="error">{newBookError}</Alert>}
            </Stack>
          </DialogContent>
        </Dialog>
   
        <AddBookButton onClick={()=> setBookDialog(true)}>New Book +</AddBookButton>
        <p>Your Library</p>
      {bool? <Grid container spacing={2}>
        {user.books&&
        user.books.map(book=>
          <Grid key={book.id} item xs={4}>
              <p>{book.title}</p>
              <p style={{color:"gray", fontSize:".8em"}}>By {book.author}</p>
              <ViewBookButton onClick={()=>route.push(`/dashboard/${book.id}`)}>View Book</ViewBookButton>
          </Grid>
        )
        }
        </Grid>
        :<p>Loading</p>
      }
        </>
        
        
      
        <br/>



        
        </>
    )
}
