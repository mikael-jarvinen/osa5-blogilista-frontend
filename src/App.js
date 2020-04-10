import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Account from './components/AccountControl.js'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from './reducers/notificationReducer'

const compareBlogs = (firstBlog, secondBlog) => {
  if (firstBlog.likes > secondBlog.likes) {
    return -1
  } else if (secondBlog.likes > firstBlog.likes) {
    return 1
  } else {
    return 0
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notificationMessage = useSelector(state => state.notification)

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs( initialBlogs.sort(compareBlogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(showMessage(`Logged in succesfully as ${user.name}`))
    } catch (exception) {
      dispatch(showMessage('Wrong credentials!'))
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    dispatch(showMessage('Logged in succesfully'))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} id='login-form'>
      <div>
          username
        <input
          id='login-form-username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          id='login-form-password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog)
      dispatch(showMessage(`succesfully added "${newBlog.title}" blog`))
      setBlogs(blogs.concat(returnedBlog).sort(compareBlogs))
    } catch (e) {
      dispatch(showMessage(`failed adding "${newBlog.title}" blog`))
    }
  }

  const blogFormRef = React.createRef()

  const Blogs = () => (
    <div>
      <Account logout={handleLogout} user={user} />
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
      {blogs.map(blog => <Blog id={blog.url} blog={blog} key={blog.title} user={user}/>)}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} />
      {user === null
        ? loginForm()
        : Blogs()
      }
    </div>
  )
}

export default App