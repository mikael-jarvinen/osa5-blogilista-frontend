import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM, fireEvent } from '@testing-library/react'
import Blog from './Blog.js'

describe('Blog test', () => {
  test('Blog renders title, author and does not render url and likes pre button submit', () => {
    const blog = {
      title: 'test_blog',
      author: 'author:test',
      url: 'tests.com',
      likes: 5,
      user: { name: 'tester_user' }
    }


    const rendered = render(
      <Blog blog={blog} user={blog.user} />
    )
    const container = rendered.container

    expect(container).toHaveTextContent(blog.title, blog.author)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
    expect(container).not.toHaveTextContent(blog.user.name)
  })

  test('Blog renders url and likes after button press', () => {
    const blog = {
      title: 'test_blog',
      author: 'author:test',
      url: 'tests.com',
      likes: 5,
      user: { name: 'tester_user' }
    }

    const rendered = render(
      <Blog blog={blog} user={blog.user} />
    )
    const button = rendered.getByText('view')
    fireEvent.click(button)

    const container = rendered.container
    expect(container).toHaveTextContent(blog.title, blog.author)
    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(blog.likes)
    expect(container).toHaveTextContent(blog.user.name)
  })
})