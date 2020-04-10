import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../reducers/userViewReducer'

const UserView = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id])
  const user = useSelector(state => state.userViews.user)

  const userInfo = () => (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )

  return (
    <div>
      {user
        ? userInfo()
        : null
      }
    </div>
  )
}

export default UserView