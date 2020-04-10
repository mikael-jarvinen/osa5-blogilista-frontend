import loginService from '../services/login'
import blogService from '../services/blogs'
import { showMessage } from './notificationReducer'

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user
      })
      dispatch(showMessage(`Logged in succesfully as ${user.name}`))
    } catch (e) {
      dispatch(showMessage('Wrong credentials!'))
    }
  }
}

export const storageLogin = () => {
  return async dispatch => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        user
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT'
    })
    dispatch(showMessage('Logged out succesfully'))
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default userReducer