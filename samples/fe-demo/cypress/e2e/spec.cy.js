const pageUrl = "http://127.0.0.1:8080/"

describe('Automated tests for local website works', () => {
  it('the page loads successfully', () => {
    cy.visit(pageUrl)
  })

  it('display Registration form on load', () => {
    cy.visit(pageUrl)

    cy.get("h2").should('have.text', 'Registration Form')
    cy.contains('Registration Form')
    cy.contains('h2','Registration Form')
  })

  it('display submit button on load', () => {
    cy.visit(pageUrl)
    cy.get("button").should('have.text', 'Submit')
    cy.contains('button','Submit')
  })

  it('Allows to fill the data', () => {
    cy.visit(pageUrl)
    cy.get("#name").type('Jaunius')
    cy.get("#email").type('JauniusPinelis@gmail.com')

    cy.get("button").click()
  })
})

// Check that all elements load

  // Check that REgistration title is displayed

  // Check that form is visible and empty

  // Check that the Submit button is visible.

  // The table is visible empty.

// Happy path functionlity

  // I am able to fill data and submit it.

    // The table contains the data i have sent
    // After the sending the registration form gets emptied.

// Edges cases
