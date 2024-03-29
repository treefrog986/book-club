"use server"
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import sql from './db';
const bcrypt = require('bcrypt')

export async function createUser(user){
    try{
        const rows = await sql`
        Select * 
        from users 
        where email=${user.email}`
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
        throw ""
    }
    const user = res[0]
    if(!user){
        throw""
    }

    const passwordMatch = await bcrypt.compare(pass, user.password)
    if(passwordMatch){ 
        delete user.password
        return user
    } else{
        throw ""
    }} catch(error){
        console.log(error)
        return {error:true}
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
    await sql`
    insert into personalbook (title, author, genre, totalpages, person_id) 
    values (${book.title}, ${book.author},${book.genre},${book.totalpages}, ${id})`
} catch(error){
    console.log(error)
}
}

export async function updateBook(bookID, userID, bookInput){
    await sql`
    update personalbook
    set ${sql(bookInput, 'currentpage', 'title', 'author', 'genre', 'totalpages')}
    where id=${bookID} and person_id=${userID}
    `   
    const res = await sql`
    select *
    from personalbook
    where id=${bookID}
    `
    return res[0]
}

export async function deleteBook(bookID){
    try{
        await sql`
        delete from personalbook
        where id=${bookID}
        `
    }catch (error){
        return {error:error}
    }
}

export async function sendComment(comment, user){
    try{
        await sql`
        insert into comments (comment, id)
        values (${comment}, ${user})
        `
    }catch (error){
        return {error:error}
    }
}

export async function getComments(){
    try{
       const res = await sql`
       select name, email, comment, comment_id
       from users join comments on users.id=comments.id`
       return res
    }catch (error){
        return {error:error}
    }
}