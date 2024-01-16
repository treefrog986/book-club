"use server"
import { unstable_noStore as noStore } from 'next/cache';
import sql from './db';
const bcrypt = require('bcrypt')

export async function createUser(user){
    try{
        const rows = await sql`
        Select * 
        from users 
        where email=${user.email}`
        console.log(rows)
    if(rows.length>0){ throw "User with email already exists"}
        const hash = await bcrypt.hash(user.password, 10)
        await  sql`
        insert into users ( name, email, password) 
        values ( ${user.name}, ${user.email}, ${hash})`
        return {}
    }catch (error){
        return {error:error}
    }
   
}

export async function login(username, pass){
  try{  
    const res = await sql`
    Select * 
    from users 
    where email=${username}`
    if(!res){
        throw "Account does not exist"
    }
    const user = res[0]

    const passwordMatch = await bcrypt.compare(pass, user.password)
    if(passwordMatch){ 
        delete user.password
        return user
    } else{
        throw "Password do not match"
    }} catch(error){
        console.log(error)
        return {error: error}
    }
}

export async function getBooks(id){
    noStore()
    try{
        const rows = await sql`
        Select * 
        from personalbook 
        where person_id=${id}`
        return rows
    }catch(error){

    }
}

export async function createBook(book, id){
try{
    const res = await sql`
    insert into personalbook (title, author, genre, totalpages, person_id) 
    values (${book.title}, ${book.author},${book.genre},${book.totalpages}, ${id})`
    //console.log(res)
} catch(error){
    console.log(error)
}
}

export async function updateBook(bookID, userID, bookInput){
    const book = {
        currentpage: bookInput.currentpage
    }
    await sql`
    update personalbook
    set ${sql(book, 'currentpage')}
    where id=${bookID} and person_id=${userID}
    `   
    const res = await sql`
    select *
    from personalbook
    where id=${bookID}
    `
    return res[0]
}