describe('Smoke Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('main').should('be.visible')
  })

  it('should have working navigation', () => {
    cy.checkNavigation()
    
    // Test navigation links
    cy.get('nav a').each(($link) => {
      const href = $link.attr('href')
      if (href) {
        cy.visit(href)
        cy.url().should('include', href)
      }
    })
  })

  it('should have working mobile menu', () => {
    cy.checkMobileMenu()
  })

  it('should have working footer', () => {
    cy.checkFooter()
  })
}) 