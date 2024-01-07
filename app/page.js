"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { createUser, login } from './lib/server'
import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { AppContext } from './context'
import { useContext } from 'react'
export default function Home() {
  const router = useRouter()
  const {setData} = useContext(AppContext)
  const [error, setError] = useState("")
  const [signIn, setSignIn] = useState(false)
  const [signInCredentials, setSignInCredentials] = useState({username:"", password:""})
  const [signUpDialog, setSignUpDialog] = useState(false)
  const [newUserCredentials, setNewUserCredentials] = useState({email:"", password:"", name:""})
  async function logIn (){
      const res = await login(signInCredentials.username, signInCredentials.password)
      console.log(res)
      if(!res.error){
        setSignIn(false)
        setData({isLoggedIn:true, email: res.email, name:res.name, id: res.id, books:[]})
        router.push(`/dashboard`)
      }else{
        setError(res.error)
      }
}
  async function signUp (){
    const res = await createUser(newUserCredentials)
    if(!res.error){
     const res = await login(newUserCredentials.email, newUserCredentials.password)
     setSignUpDialog(false)
     setData({isLoggedIn:true, email: res.email, name:res.name, id: res.id, books:[]})
      router.push(`/dashboard`)
    }
  }
  useEffect(()=>{
    const test = async ()=>{
     const res = await createUser({email:"eli02", password:"pass", name:"Eli"})
  console.log(res)
    }
    
    //test()
    setData({
      isLoggedIn:false,
      email:"",
      name: ""
    })
  }, [])
  
  return ( <>
  <Dialog
  open={signIn}
  >
    <DialogTitle>
      Sign In
    </DialogTitle>
    <DialogContent>
      <Stack direction={'column'}>
        <p>Username</p>
      <TextField
      value = {signInCredentials.username}
      autoComplete='off'
      onChange={e=>setSignInCredentials(p=>({...p, username: e.target.value}))}
      />
      <p>Password</p>
      <TextField
       value = {signInCredentials.password}
       autoComplete='off'
       onChange={e=>setSignInCredentials(p=>({...p, password: e.target.value}))}
      />
       {error && <p>{error}</p>}
      <Button onClick={logIn}>Sign In</Button>
      </Stack>
    </DialogContent>
  </Dialog>
  <Dialog
  open={signUpDialog}
  >
    <DialogTitle>Sign Up</DialogTitle>
    <DialogContent>
      <Stack direction={"column"}>
        <p>Name</p>
        <TextField
        value = {newUserCredentials.name}
        onChange={e=>setNewUserCredentials(p=>({...p, name:e.target.value}))}
        />
        <p>Email</p>
        <TextField
        value = {newUserCredentials.email}
        onChange={e=>setNewUserCredentials(p=>({...p, email:e.target.value}))}
        />
        <p>Password</p>
        <TextField
        value = {newUserCredentials.password}
        onChange={e=>setNewUserCredentials(p=>({...p, password:e.target.value}))}
        />
        <Button onClick={signUp}>Sign Up</Button>
      </Stack>
    </DialogContent>
  </Dialog>
  <Button onClick={()=>setSignIn(true)}>Sign In</Button>
  <Button onClick={()=>setSignUpDialog(true)}>Sign Up</Button>
 
  </>
  )
}
