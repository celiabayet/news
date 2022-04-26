import React, {useState} from 'react';
import '../stylesheets/App.css';
import {Input} from 'antd';
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { Typography, Box, Grid, Button, Modal } from '@mui/material';


function Home(props) {

  // State variables
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  //Sign Up
  var handleSubmitSignup = async () => {
    const data = await fetch('users/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `username=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`
    })

    const body = await data.json()
    console.log(body)

    if(body.result === true){
      props.addToken(body.token)
      setUserExists(true)
      
    } else {
      setErrorsSignup(body.error)
    }
  }

  // Sign In
  var handleSubmitSignin = async () => {
 
    const data = await fetch('users/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}`
    })

    const body = await data.json()

    if(body.result === true){
      props.addToken(body.token)
      setUserExists(true)
      
    }  else {
      setErrorsSignin(body.error)
    }
  }

  // Connection and errors
  if(userExists){
    return <Redirect to='/source' />
  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<p>{error}</p>)
  })

  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<p>{error}</p>)
  })

  
  // Return
  return (
    
      <div className='section'>
        <Box 
          className='opacity'
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  mb={10}>
            <Grid item>
               <Typography variant='h2' textAlign='center'>
                Welcome to morning news
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={8}>

            {/* SIGN IN with modal */}
             <Grid item>
              <Button 
                size='large' 
                variant='contained' 
                color='primary' 
                sx={{ minWidth: '200px' }} 
                onClick={handleOpenSignIn}
              >
                Sign in
              </Button>

               <Modal 
                  open={openSignIn}
                  onClose={handleCloseSignIn}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description">
                    
                  <Grid container sx={style}>
                    <Grid item mb={2}>
                      <Typography>
                        {tabErrorsSignin}
                      </Typography>
                    </Grid>
                   <Grid item sx={{width: '250px'}} mb={2}>
                      <Input 
                        onChange={(e) => setSignInEmail(e.target.value)}
                        className="Login-input"
                        placeholder="email" 
                      />
                   </Grid>
                   <Grid item  sx={{width: '250px'}}mb={2}>
                      <Input.Password 
                        onChange={(e) => setSignInPassword(e.target.value)} 
                        className="Login-input" 
                        placeholder="password" 
                      />
                   </Grid>
                   <Grid item>
                      <Button 
                        onClick={() => handleSubmitSignin()} 
                        style={{width:'80px'}}
                        variant='outlined'
                        color='primary'
                      >
                          Sign-in
                      </Button>
                   </Grid>
                  </Grid>
              </Modal>
            </Grid>

            {/* SIGN UP with modal */}
             <Grid item>
              <Button 
                size='large' 
                variant='contained' 
                color='primary' 
                sx={{ minWidth: '200px' }} 
                onClick={handleOpenSignUp}
              >
                Sign Up
              </Button>

               <Modal 
                  open={openSignUp}
                  onClose={handleCloseSignUp}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description">
                    
                  <Grid container sx={style}>
                    <Grid item >
                      <Typography variant='body2'>
                        {tabErrorsSignup}
                      </Typography>
                    </Grid>
                    <Grid item sx={{width: '250px'}} mb={2}>
                      <Input 
                        onChange={(e) => setSignUpUsername(e.target.value)} 
                        className="Login-input" 
                        placeholder="username" 
                      />
                    </Grid>
                    <Grid item sx={{width: '250px'}} mb={2}>
                      <Input 
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="Login-input"
                        placeholder="email" 
                      />
                    </Grid>
                    <Grid item sx={{width: '250px'}} mb={2}>
                      <Input.Password 
                        onChange={(e) => setSignUpPassword(e.target.value)} 
                        className="Login-input" 
                        placeholder="password" 
                      />
                    </Grid>
                    <Grid item>
                      <Button 
                        onClick={() => handleSubmitSignup()} 
                        style={{width:'80px'}}
                        variant='outlined'
                        color='primary'
                      >
                          Sign-up
                      </Button>
                    </Grid>
                  </Grid>
              </Modal>
            </Grid>   
          </Grid>   
        </Box>
        
      </div> 
  );
}

// Style 
const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 3,
  pb: 3
};

// Store
function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    }
  }
}

// Export
export default withRouter(
  connect(
  null,
  mapDispatchToProps
)(Home));
