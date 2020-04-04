import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Account from './components/AccountControl.js'
import NewBlog from './components/NewBlog'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs( initialBlogs )
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
      setErrorMessage('logged in succesfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    setErrorMessage('logged out succesfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )
  
  const addBlog = (event, newTitle, newAuthor, newUrl) => {
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    
    try {
      blogService.create(newBlog)
      setErrorMessage(`succesfully added ${newBlog.title} blog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (e) {
      setErrorMessage(`failed adding ${newBlog.title} blog`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Blogs = () => (
    <div>
      <Account logout={handleLogout} user={user} />
      <NewBlog addBlog={addBlog} />
      {blogs.map(blog => <Blog blog={blog} key={blog.title}/>)}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null 
      ? loginForm()
      : Blogs()
      }
    </div>
  )
}

export default App