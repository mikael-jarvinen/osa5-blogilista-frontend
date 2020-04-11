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
import BlogView from './components/BlogView'
import Navbar from './components/Navbar'
import { getUsers } from './reducers/userViewReducer'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(storageLogin())
  }, [dispatch])

  const logon = () => (
    <div>
      <Router>
        <Navbar />
        <Notification />
        <Switch>
          <Route path='/users/:id'><UserView /></Route>
          <Route path='/blogs/:id'><BlogView /></Route>
          <Route path='/users'><UsersView /></Route>
          <Route path='/'><Blogs /></Route>
        </Switch>
      </Router>
    </div>
  )

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#A9114F'
      },
      secondary: {
        main: '#638E9C'
      },
      text: {
        primary: '#313131',
        secondary: '#505050'
      },
    },
    typography: {
      htmlFontSize: 14,
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Typography variant='body2' component='span'>
        {user === null
          ? <LoginForm />
          : logon()
        }
      </Typography>
    </ThemeProvider>
  )
}

export default App