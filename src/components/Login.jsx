import { useEffect, useState } from "react"
import { NavLink, useNavigate } from 'react-router-dom'
import { Alert, Avatar, AlertTitle, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { ClipLoader, PuffLoader} from 'react-spinners'

function Login() {
  
  const [user_name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState('');
  const[page, setPage] = useState(true);

  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false)

    try {
      const response = await fetch('https://apiauth-v1.onrender.com/api/login', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user_name, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home')
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  };
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
      { error && <Alert className="mt-2" variant="filled" severity="error">
        <AlertTitle>Error</AlertTitle>
        { error }
      </Alert> }
      
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
        Connexion
      </Typography>
      <Box 
      component='form' 
      onSubmit={handleLogin} 
      noValidate 
      sx={{ mt: 1 }}>

       <TextField 
          placeholder='Enter username' 
          fullWidth 
          required 
          autoFocus 
          sx={{ mb: 2 }}
          onChange={(e) => setUsername(e.target.value)}
        /> 
       <TextField 
          placeholder='Enter password' 
          fullWidth 
          required 
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        /> 
        <FormControlLabel control={<Checkbox value="remenber" color='primary'/>}
        label="Remenber me" />
        <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }} >
        { loading ? <ClipLoader size={25} color="#FFFFFF"/> : 'Se connecter'}
        </Button>
      </Box>
      <Grid container justifyContent='space-between' sx={{ mt: 1 }}>
        <Grid >
          havn't account?  
          <NavLink  to="/register">
            Register
          </NavLink> 
          
        </Grid>
      </Grid>
    </Paper>
  </Container>
  )
}

export default Login