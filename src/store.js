import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'
import blogFormReducer from './reducers/blogFormReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogsReducer,
  blogForm: blogFormReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store