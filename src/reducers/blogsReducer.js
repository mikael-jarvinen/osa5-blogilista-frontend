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

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE':
    return state.concat(action.new).sort(compareBlogs)
  case 'INIT':
    return action.blogs.sort(compareBlogs)
  default:
    return state
  }
}

export default blogsReducer