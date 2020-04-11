import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { toggleVisibility } from '../reducers/blogFormReducer'
import { Button } from '@material-ui/core'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const visible = useSelector(state => state.blogForm)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggle = () => {
    dispatch(toggleVisibility())
  }


  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='outlined' onClick={toggle} id='add-blog-button'>add blog</Button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm />
        <Button onClick={toggle}>cancel</Button>
      </div>
      {blogs.map(blog => <Blog id={blog.url} blog={blog} key={blog.title} />)}
    </div>
  )
}

export default Blogs