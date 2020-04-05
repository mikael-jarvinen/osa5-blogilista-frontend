import React from 'react'
import Togglable from './Togglable'

const BlogMeta = ({ blog }) => {
  return (
    <>
      {blog.url} <br />
      {blog.likes} <button>like</button> <br />
      {blog.user.name} <br />
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
