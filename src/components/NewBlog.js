import React, { useState } from 'react'

const NewBlog = ({addBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  return (
    <form onSubmit={(event) => addBlog(event, newTitle, newAuthor, newUrl)}>
      <h2>Add new blog</h2>
      <div>
        title:
          <input 
          type='text'
          value={newTitle}
          name='Title'
          onChange={({target}) => setNewTitle(target.value)}
          />
      </div>
      <div>
        author:
          <input 
          type='text'
          value={newAuthor}
          name='Author'
          onChange={({target}) => setNewAuthor(target.value)}
          />
      </div>
      <div>
        url:
          <input
          type='text'
          value={newUrl}
          name='Url'
          onChange={({target}) => setNewUrl(target.value)}
          />
      </div>
      <button type='submit'>save</button>
    </form>
  )
}

export default NewBlog