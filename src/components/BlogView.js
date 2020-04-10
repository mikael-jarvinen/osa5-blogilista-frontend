import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(element => element.id === id)

  const showBlogs = () => (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes 
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </div>
    </div>
  )

  return (
    <div>
      {blog
        ? showBlogs()
        : null}
    </div>
  )
}

export default BlogView