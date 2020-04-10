import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const UsersView = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    blogService.users()
      .then(response => {
        console.log(response)
        setUsers(response)
      })
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView