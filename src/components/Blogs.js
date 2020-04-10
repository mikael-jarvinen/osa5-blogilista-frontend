import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { toggleVisibility } from '../reducers/blogFormReducer'

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
        <button onClick={toggle} id='add-blog-button'>add blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm />
        <button onClick={toggle}>cancel</button>
      </div>
      {blogs.map(blog => <Blog id={blog.url} blog={blog} key={blog.title} />)}
    </div>
  )
}

export default Blogs