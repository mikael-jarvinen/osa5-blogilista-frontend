import React, { useEffect } from 'react'
import Notification from './components/Notification'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { storageLogin } from './reducers/userReducer'
import { initBlogs } from './reducers/blogsReducer'
import LoginForm from './components/LoginForm'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Blogs from './components/Blogs'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import Account from './components/AccountControl'
import { logout } from './reducers/userReducer'
import BlogView from './components/BlogView'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(storageLogin())
  }, [dispatch])

  const logon = () => (
    <div>
      <Account logout={() => dispatch(logout())} />
      <Router>
        <Switch>
          <Route path='/users/:id'><UserView /></Route>
          <Route path='/blogs/:id'><BlogView /></Route>
          <Route path='/users'><UsersView /></Route>
          <Route path='/'><Blogs /></Route>
        </Switch>
      </Router>
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null
        ? <LoginForm />
        : logon()
      }
    </div>
  )
}

export default App