import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'
import blogFormReducer from './reducers/blogFormReducer'
import userViewReducer from './reducers/userViewReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogsReducer,
  blogForm: blogFormReducer,
  userViews: userViewReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store