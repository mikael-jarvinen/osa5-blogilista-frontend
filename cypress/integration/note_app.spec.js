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
})