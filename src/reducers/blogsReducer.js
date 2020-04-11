import blogService from '../services/blogs'
import { showMessage } from './notificationReducer'

const compareBlogs = (firstBlog, secondBlog) => {
  if (firstBlog.likes > secondBlog.likes) {
    return -1
  } else if (secondBlog.likes > firstBlog.likes) {
    return 1
  } else {
    return 0
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(blog)
      dispatch(showMessage(`succesfully added "${blog.title}" blog`))
      dispatch({
        type: 'CREATE',
        new: returnedBlog
      })
    } catch (e) {
      dispatch(showMessage(`failed adding "${blog.title}" blog`))
    }
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      blogs
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.update(newBlog, blog.id)
    dispatch({
      type: 'LIKE',
      blog: newBlog
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const response = await blogService.commentBlog(blog.id, comment)
    dispatch({
      type: 'COMMENT',
      blog: response
    })
  }
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE':
    return state.concat(action.new).sort(compareBlogs)
  case 'INIT':
    return action.blogs.sort(compareBlogs)
  case 'LIKE':
    return state
      .filter(blog => blog.id !== action.blog.id)
      .concat(action.blog)
  case 'COMMENT':
    return state
      .filter(blog => blog.id !== action.blog.id)
      .concat(action.blog)
  default:
    return state
  }
}

export default blogsReducer