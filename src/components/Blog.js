import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs.js'

const BlogMeta = ({ blog }) => {
  const [blogState, setBlogState] = useState(blog)

  const addLike = event => {
    event.preventDefault()
    const newBlog = {
      ...blogState,
      likes: blogState.likes + 1
    }
    blogService.update(newBlog, blog.id)
    setBlogState(newBlog)
  }

  return (
    <>
      {blogState.url} <br />
      {blogState.likes} 
      <form onSubmit={(event) => addLike(event)}>
        <button type='submit'>like</button> <br />
      </form>
      {blogState.user.name} <br />
    </>
  )
}

const Blog = ({ blog }) => {
  return (
    <div className='blogView'>
    {blog.title} {blog.author} 
    <Togglable buttonLabel='view' closeLabel='hide'>
      <BlogMeta blog={blog} />
    </Togglable>
  </div>
  )
}

export default Blog
