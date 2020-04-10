import React from 'react'
import { useSelector } from 'react-redux'

const Controls = ({ logout }) => {
  const user = useSelector(state => state.user)
  return (
    <form onSubmit={logout}>
      logged in as {user.name} <button type='submit'>logout</button>
    </form>
  )
}

export default Controls