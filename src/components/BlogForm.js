import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { toggleVisibility } from '../reducers/blogFormReducer'
import { Button } from '@material-ui/core'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const dispatch = useDispatch()

  const addBlog = async (newBlog) => {
    dispatch(toggleVisibility())
    dispatch(createBlog(newBlog))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    addBlog(newBlog)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new</h2>
      Title:
      <input
        id='blogform-title'
        type='text'
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
      />
      Author:
      <input
        id='blogform-author'
        type='text'
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}
      />
      Url:
      <input type='text'
        id='blogform-url'
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}
      />
      <Button id='submit-button' type='submit'>Add Blog</Button>
    </form>
  )
}

export default BlogForm