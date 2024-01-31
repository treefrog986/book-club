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
  const {setUser} = useContext(AppContext)
  const [error, setError] = useState(false)
  const [signIn, setSignIn] = useState(false);
  const [signUpError, setSignUpError] = useState(false)
  const [signInCredentials, setSignInCredentials] = useState({email:"", password:""})
  const [signUpDialog, setSignUpDialog] = useState(false)
  const [newUserCredentials, setNewUserCredentials] = useState({email:"", password:"", name:""})
  
  async function logIn (logInCredentials){
      const res = await login(logInCredentials.email, logInCredentials.password)
      if(!res.error){
        setSignIn(false)
        setUser({isLoggedIn:true, email: res.email, name:res.name, id: res.id, books:[],
        auth: res.auth})
        router.push(`/dashboard`)
      }else{
        setError(true)
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
      await logIn(newUserCredentials)
    }
  }
  useEffect(()=>{
    setUser({
      isLoggedIn:false,
      email:"",
      name: ""
    })
  }, [])
  
  useEffect(()=>{
    setNewUserCredentials({email:"", password:"", name:""})
    setSignUpError(false)
  }, [signUpDialog])

  useEffect(()=>{
    setSignInCredentials({email:"", password:""})
    setError(false)
  }, [signIn])

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
      value = {signInCredentials.email}
      autoComplete='off'
      onChange={e=>setSignInCredentials(p=>({...p, email: e.target.value}))}
      />
      <p>Password</p>
      <TextField
      type="password"
       value = {signInCredentials.password}
       autoComplete='off'
       onChange={e=>setSignInCredentials(p=>({...p, password: e.target.value}))}
      />
      
      <SignInButton onClick={()=>logIn(signInCredentials)}>Sign In</SignInButton>
      {error && <Alert severity='error'>Email or password invalid</Alert>}
      </Stack>
    </DialogContent>
  </Dialog>
  <Dialog
  open={signUpDialog}
  onClose={()=>setSignUpDialog(false)}
  fullWidth
  maxWidth={"sm"}
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
        <SignInButton onClick={signUp}>Sign Up</SignInButton>
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
