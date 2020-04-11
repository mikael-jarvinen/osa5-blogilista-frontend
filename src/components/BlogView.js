import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogsReducer'
import { Typography } from '@material-ui/core'

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(element => element.id === id)

  const showBlogs = () => (
    <div>
      <Typography variant='h6'>{blog.title} {blog.author}</Typography>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </div>
      <Typography variant='h6'>Comments</Typography>
      <form onSubmit={event => {
        event.preventDefault()
        dispatch(commentBlog(blog, event.target.blog_comment.value))
      }}>
        <input name='blog_comment'/>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
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