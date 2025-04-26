import React, { useState, useEffect } from 'react'
import { Alert, AlertTitle, Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { ClipLoader, PuffLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';

function register() {
  const [user_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpwd, setConfirmpwd] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false)
  const[page, setPage] = useState(true);
  

// Spinner loader page
  useEffect(()=> {
      const timer = setTimeout(() => {
        setPage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);


// Error message setTimeout
  useEffect(()=> {
    if(error) {
      const timer = setTimeout(() => {
        setError('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

// Succes message setTimeout
  useEffect(()=> {
    if(success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);
    

// Email verification
  function isValidEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if(user_name ==='' || password==='' || email ==='' || confirmpwd ==='') {
      setError('Champs obligatoires')
    } else if(password !== confirmpwd) {
      setError('Mot de passe non conforme')
    } else if (!isValidEmail) {
      setError('Provide a valid email')
    } else {
      setLoading(true);
      try {
        const response = await fetch('https://apiauth-v1.onrender.com/api/register', {
          method: 'POST',
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ user_name, email, password }),
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setSuccess(data.message)
        } else {
          setError(data.message)
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
  }

// Function load spinner page
    if (page) return <div style={{ 
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} >
          <PuffLoader size={80} />
        </div>
  return (
    <Container maxWidth="xs">
      { success && <Alert className='mt-2 z-index-2' variant='filled' severity='success'>
        <AlertTitle>Success</AlertTitle>
        { success }
      </Alert>}
      { error && <Alert  className='mt-2' variant='filled' severity='error'>
        <AlertTitle>Error</AlertTitle>
        { error }
      </Alert>}
      
      <Paper elevation={10} sx={{marginTop: 8, padding: 2, mt: 15 }}>
        <Avatar sx={{
          mx: 'auto',
          bgcolor: 'secondary.main',
          textAlign: 'center',
          mb: 1,
        }}>
          <LockOutlineIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ textAlign: 'center'}}>
          Register
        </Typography>
        <Box 
        component='form' 
        onSubmit={handleSubmit} 
        noValidate 
        sx={{ mt: 1 }}>

         <TextField 
            placeholder='john_doe' 
            fullWidth 
            required 
            autoFocus
            type='text' 
            sx={{ mb: 2 }}
            onChange={(e) => setUsername(e.target.value)}
          /> 
         <TextField 
            placeholder='johndoe@gmail.com' 
            fullWidth 
            required 
            autoFocus 
            type='email'
            sx={{ mb: 2 }}
            onChange={(e) => setEmail(e.target.value)}
          /> 
         <TextField 
            placeholder='Enter password' 
            fullWidth 
            required 
            type='password'
            sx={{ mb: 2 }}
            onChange={(e) => setPassword(e.target.value)}
          /> 
         <TextField 
            placeholder='Confirme password' 
            fullWidth 
            required 
            type='password'
            onChange={(e) => setConfirmpwd(e.target.value)}
          /> 
          <FormControlLabel control={<Checkbox value="remenber" color='primary'/>}
          label="Remenber me" />
          <Button type='submit' variant='contained' fullWidth sx={{ mt: 1, mb: 1 }} >
          { loading ? <ClipLoader size={25} color="#FFFFFF"/> : 'S\'enregistrer'} 
          </Button>
          
        </Box>
       <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
               <Grid >
                  Have account? 
                 <NavLink  to="/">
                   Login
                 </NavLink> 
                 
               </Grid>
             </Grid>
      </Paper>
    </Container>
  )
}


export default register