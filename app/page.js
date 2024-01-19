"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createUser, login } from './lib/server'
import { Alert, Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { AppContext } from './context'
import { useContext } from 'react'
import { SignInButton, Title } from './styles'
export default function Home() {
  const router = useRouter()
  const {setData} = useContext(AppContext)
  const [error, setError] = useState("")
  const [signIn, setSignIn] = useState(false);
  const [signUpError, setSignUpError] = useState(false)
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
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

  async function signUp (){

    if(newUserCredentials.name.length===0
      ||newUserCredentials.password.length<7
      ||!validateEmail(newUserCredentials.email)){
        setSignUpError(true)
        return
      }
      const res = await createUser(newUserCredentials)
    if(!res.error){
     const res = await login(newUserCredentials.email, newUserCredentials.password)
     console.log(res)
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
  
  return ( <div>
  <Dialog
  open={signIn}
  onClose={()=>setSignIn(false)}
  >
    <Title>
      Sign In
    </Title>
    <DialogContent>
      <Stack direction={'column'}>
        <p>Email</p>
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
  onClose={()=>setSignUpDialog(false)}
  >
    <Title>Sign Up</Title>
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
        {signUpError &&
        <Alert severity='error'>
          <p>Your login information</p>
          <p>Must contain a name</p>
          <p>Must contain a valid email</p>
          <p>Must contain a password that is 7 or more characters</p>
        </Alert>
        }
        <Button onClick={signUp}>Sign Up</Button>
      </Stack>
    </DialogContent>
  </Dialog>
    <Stack direction={"column"} sx={{alignItems:"center", marginTop:40}}>
  <SignInButton onClick={()=>setSignIn(true)}>Sign In</SignInButton>
  <SignInButton onClick={()=>setSignUpDialog(true)}>Sign Up</SignInButton>
  </Stack>
  </div>
  )
}
