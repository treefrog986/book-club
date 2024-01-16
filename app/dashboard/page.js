"use client"
import { useContext, useEffect, useState } from "react"
import { AppContext} from "../context"
import Link from "next/link"
import { createBook, getBooks } from "../lib/server"
import { Dialog, DialogContent, DialogTitle, TextField, Stack, Button} from "@mui/material"
import { useRouter } from "next/navigation"
export default function Dashboard(){
    const route = useRouter()
    const {data, setData} = useContext(AppContext)
    const [newBook, setNewBook] = useState({title:"", author:"", genre:"", totalpages:0})
    const [bookDialog, setBookDialog] = useState(false)
    useEffect(()=>{
      const books = async ()=>{
        const res = await getBooks(data.id)
        console.log(res)
        setData(p=>({...p, books:res}))
      }
      books()
    },[])
    const submitBook = async ()=>{
       await createBook(newBook, data.id)
       setBookDialog(false)
       const res = await getBooks(data.id)
       setData(p=>({...p, books:res}))
    }
    return(<>
      {  data.isLoggedIn?
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
        <>Hello, {data.name}</>
   
        <Button onClick={()=> setBookDialog(true)}>Add New book</Button>
        <p>Your Library</p>
        {data.books&&
        data.books.map(book=>
          <p key={book.id}> {book.title}: {book.author} <Button onClick={()=>route.push(`/dashboard/${book.id}`)}> go to page</Button></p>
        )
        }
        </>
        :
        <>
        <p>You are not logged in</p>
         <Link href="/">Log Out</Link>
        
        </>}
        <br/>



        
        </>
    )
}