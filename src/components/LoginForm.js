import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import Notification from './Notification'
import { TextField, Button, Box, Typography } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(event.target.login_form_username.value,
      event.target.login_form_password.value))
  }

  return (
    <Box>
      <Typography variant='h3'>Blogs</Typography>
      <Notification />
      <form onSubmit={handleLogin} id='login-form'>
        <div>
          <TextField
            label='Username'
            name='login_form_username'
            type="text"
          />
        </div>
        <div>
          <TextField
            label='Password'
            name='login_form_password'
            type="password"
          />
        </div>
        <Button variant='outlined' type="submit">login</Button>
      </form>
    </Box>
  )
}

export default LoginForm