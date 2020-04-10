import React, { useEffect } from 'react'
import Notification from './components/Notification'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { storageLogin } from './reducers/userReducer'
import { initBlogs } from './reducers/blogsReducer'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(storageLogin())
  }, [dispatch])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null
        ? <LoginForm />
        : <Blogs />
      }
    </div>
  )
}

export default App