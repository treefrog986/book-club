"use client"
import { AppContext } from "@/app/context";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function BookID(){
    const route = useRouter()
    const {book_id} = useParams()
    const {data} = useContext(AppContext)
    const book = data.books?.filter(x=>x.id===parseInt(book_id))[0]
    return(book&&<>
    <p>Name : {book.title}</p>
    <p>Author : {book.author}</p>
    <p>Genre : {book.genre}</p>
    <p>Total pages : {book.totalpages}</p>
    </>)
}