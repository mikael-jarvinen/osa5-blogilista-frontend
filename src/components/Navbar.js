import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <div style={{ padding: 3, backgroundColor: '#8a8a88' }}>
      <Link to='/' style={{ margin: 5 }}>blogs</Link>
      <Link to='/users' style={{ margin: 5 }}>users</Link>
      logged in as {user.username}
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Navbar