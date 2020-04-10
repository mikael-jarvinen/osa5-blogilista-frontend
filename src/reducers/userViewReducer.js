import blogService from '../services/blogs'

export const getUsers = () => {
  return async dispatch => {
    const users = await blogService.users()
    dispatch({
      type: 'USERS_INIT',
      users
    })
  }
}

export const getUser = id => {
  return async dispatch => {
    const user = await blogService.user(id)
    const blogs = await Promise.all(user.blogs.map(async id => await blogService.getOne(id)))
    console.log(blogs)
    dispatch({
      type: 'USER_INIT',
      user: { ...user, blogs: blogs }
    })
  }
}

const userViewReducer = (state = { user: null, users: [] }, action) => {
  switch (action.type) {
  case 'USERS_INIT':
    return {
      ...state,
      users: action.users
    }
  case 'USER_INIT':
    return {
      ...state,
      user: action.user
    }
  default:
    return state
  }
}

export default userViewReducer