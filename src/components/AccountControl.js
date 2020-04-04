import React from 'react'

const controls = ({logout, user}) => {
  return (
    <form onSubmit={logout}>
      logged in as {user.name} <button type='submit'>logout</button>
    </form>
  )
}

export default controls