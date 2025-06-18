// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// ***********************************************

Cypress.Commands.add('checkNavigation', () => {
  cy.get('nav').should('be.visible')
  cy.get('nav a').should('have.length.at.least', 1)
})

Cypress.Commands.add('checkMobileMenu', () => {
  // Set a very small viewport to ensure mobile view
  cy.viewport(375, 667) // iPhone SE size
  
  // Ensure we're in mobile view
  cy.get('[data-cy="mobile-menu-button"]').should('be.visible')
  
  // Click the menu button and wait for the state to change
  cy.get('[data-cy="mobile-menu-button"]').click()
  cy.wait(200)
  
  // Wait for the menu to be visible and check its contents
  cy.get('[data-cy="mobile-menu"]', { timeout: 5000 })
    .should('exist')
    .should('be.visible')
    .within(() => {
      cy.get('a').should('have.length', 5) // We have 5 nav items
    })
  
  // Click the menu button again to close it
  cy.get('[data-cy="mobile-menu-button"]').click()
  cy.wait(200)
  
  // Verify the menu is hidden
  cy.get('[data-cy="mobile-menu"]').should('not.exist')
})

Cypress.Commands.add('checkFooter', () => {
  cy.get('footer').should('be.visible')
  cy.get('footer a').should('have.length.at.least', 1)
}) 