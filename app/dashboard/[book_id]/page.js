"use client"
import { AppContext } from "@/app/context";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState} from "react";
import { Button, TextField , Dialog, DialogTitle, DialogContent,
    Stack } from "@mui/material";
import { deleteBook, getBooks, updateBook } from "@/app/lib/server";

export default function BookID(){
    const route = useRouter()
    const {book_id} = useParams()
    const {data} = useContext(AppContext)
    const [book, setBook]= useState(data.books?.filter(x=>x.id===parseInt(book_id))[0])
    const [newBook, setNewBook] = useState(data.books?.filter(x=>x.id===parseInt(book_id))[0])
    const [editBook, setEditBook] = useState(false)
    const update = async ()=>{
        const res = await updateBook(book_id,data.id, newBook)
        setBook(res)
        setNewBook(res)
    }
    return(book&&<>
     <Dialog
        open = {editBook}
        onClose={()=>setEditBook(false)}
        >
          <DialogTitle>Edit book</DialogTitle>
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
              <Button onClick={async()=>{
                await update()
                setEditBook(false)
              }}>Update</Button>
            </Stack>
          </DialogContent>
        </Dialog>
    <p>Name : {book.title}</p>
    <p>Author : {book.author}</p>
    <p>Genre : {book.genre}</p>
    <p>Total pages : {book.totalpages}</p>
    <p>Current page : {book.currentpage}</p>
    <TextField
    value={newBook.bookPage}
    onChange={e=>setNewBook(p=>({...p, currentpage:e.target.value}))}
    />

    <Button
    onClick={update}
    >Update Book</Button>
    <Button onClick={async()=>{
        await deleteBook(book_id)
        route.push("/dashboard")
    }}>
        Delete
    </Button>
    <Button
    onClick={()=>setEditBook(true)}
    >
        Edit
    </Button>
    </>)
}