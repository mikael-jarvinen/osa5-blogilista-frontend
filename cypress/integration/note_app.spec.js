describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })
  it('front page shows login form', function () {
    cy.get('#login-form').contains('username')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-form-username').type('root')
      cy.get('#login-form-password').type('salainen')
      cy.get('#login-form').get('button').click()
      cy.contains('logged in as root')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-form-username').type('root')
      cy.get('#login-form-password').type('notpassword')
      cy.get('#login-form').get('button').click()
      cy.get('.error').contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('a new blog can be created', function() {
      cy.get('#add-blog-button').click()
      cy.get('#blogform-title').type('cypress testing')
      cy.get('#blogform-author').type('cypresser')
      cy.get('#blogform-url').type('cypress.com')
      cy.get('#submit-button').click()
      cy.get('.error').contains('succesfully added cypress testing blog')
      cy.contains('cypress testing cypresser')
    })

    describe('When created a blog', function() {
      beforeEach(function() {
        cy.get('#add-blog-button').click()
        cy.get('#blogform-title').type('cypress testing')
        cy.get('#blogform-author').type('cypresser')
        cy.get('#blogform-url').type('cypress.com')
        cy.get('#submit-button').click()
        cy.visit('http://localhost:3000')
      })

      it('blog can be liked', function() {
        cy.contains('cypress testing cypresser').contains('view').click()
        cy.get('button').contains('like').click()
        cy.visit('http://localhost:3000')
        cy.contains('cypress testing cypresser').contains('view').click()
        cy.contains('cypress testing cypresser').contains('likes: 1')
      })

      it('blog can be removed', function() {
        cy.contains('cypress testing cypresser').contains('view').click()
        cy.contains('cypress testing cypresser').contains('remove').click()
        cy.contains('cypress testing cypresser').should('not.contain', 'cypress testing cypresser')
      })
    })

    describe('When created multiple blogs', function() {
      beforeEach(function() {
        const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
        const token = user.token
        const firstBlog = {
          title: 'firstBlog',
          author: 'firstAuthor',
          url: 'firstUrl',
          likes: 4
        }
        const secondBlog = {
          title: 'secondBlog',
          author: 'firstAuthor',
          url: 'firstUrl',
          likes: 10
        }
        const thirdBlog = {
          title: 'thirdBlog',
          author: 'thirdAuthor',
          url: 'thirdUrl',
          likes: 2
        }

        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: firstBlog,
          auth: {
            username: '',
            pasword: '',
            sendImmediately: true,
            bearer: `${token}`
          }
        })
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: secondBlog,
          auth: {
            username: '',
            pasword: '',
            sendImmediately: true,
            bearer: `${token}`
          }
        })
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: thirdBlog,
          auth: {
            username: '',
            pasword: '',
            sendImmediately: true,
            bearer: `${token}`
          }
        })
        cy.visit('http://localhost:3000')
      })

      const strings = ['secondBlog', 'firstBlog', 'thirdBlog']
      it.only('blogs are sorted', function() {
        cy.get('.blogView')
          .each((value, index) => {
            cy.wrap(value).contains(strings[index])
          })
      })
    })
  })
})