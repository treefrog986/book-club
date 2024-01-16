"use client"
import { AppContext } from "@/app/context";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { getBooks, updateBook } from "@/app/lib/server";

export default function BookID(){
    const route = useRouter()
    const {book_id} = useParams()
    const {data} = useContext(AppContext)
    const [book, setBook]= useState(data.books?.filter(x=>x.id===parseInt(book_id))[0])
    const [bookPage, setBookPage] = useState(book?book.currentpage:0)
    return(book&&<>
    <p>Name : {book.title}</p>
    <p>Author : {book.author}</p>
    <p>Genre : {book.genre}</p>
    <p>Total pages : {book.totalpages}</p>
    <p>Current page : {book.currentpage}</p>
    <TextField
    value={bookPage}
    onChange={e=>setBookPage(e.target.value)}
    />
    <Button
    onClick={async ()=>{
        const updatedBook = {
            ...book, 
            currentpage: bookPage}
        const res = await updateBook(book_id,data.id, updatedBook)
        setBook(res)
    }}
    >Update Book</Button>
    <p></p>
    </>)
}