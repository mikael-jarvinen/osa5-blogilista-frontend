import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Typography, Container, Button } from '@material-ui/core'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <Container style={{ backgroundColor: '#e0ebeb' }}>
      <Typography variant='body1' color='textPrimary'>
        <Link to='/' style={{ margin: 5 }}>blogs</Link>
        <Link to='/users' style={{ margin: 5 }}>users</Link>
        logged in as {user.username}
        <Button variant='outlined'
          onClick={() => dispatch(logout())}
        >logout</Button>
      </Typography>
    </Container>
  )
}

export default Navbar