"use client"
import { useContext, useEffect, useState } from "react"
import { AppContext} from "../context"
import Link from "next/link"
import { createBook, getBooks } from "../lib/server"
import { Dialog, DialogContent, DialogTitle, TextField, Stack, Button, Grid} from "@mui/material"
import { useRouter } from "next/navigation"
import { AddBookButton, ViewBookButton } from "../styles"
export default function Dashboard(){
    const route = useRouter()
    const {user, setUser} = useContext(AppContext)
    const [newBook, setNewBook] = useState({title:"", author:"", genre:"", totalpages:0})
    const [bookDialog, setBookDialog] = useState(false)
    useEffect(()=>{
      const books = async ()=>{
        const res = await getBooks(user.id)
        console.log(res)
        setUser(p=>({...p, books:res}))
      }
      books()
    },[])
    const submitBook = async ()=>{
       await createBook(newBook, user.id)
       setBookDialog(false)
       const res = await getBooks(user.id)
       setuser(p=>({...p, books:res}))
    }
    return(<>
     
        <>
        <Dialog
        open = {bookDialog}
        onClose={()=>setBookDialog(false)}
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
            </Stack>
          </DialogContent>
        </Dialog>
   
        <AddBookButton onClick={()=> setBookDialog(true)}>Add New Book +</AddBookButton>
        <p>Your Library</p>
        <Grid container spacing={2}>
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
        </>
        
        
      
        <br/>



        
        </>
    )
}