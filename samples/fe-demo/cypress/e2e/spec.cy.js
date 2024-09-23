const pageUrl = "http://127.0.0.1:8080/"

function successfullSubmit(name, email, phone){
  cy.get("#name").type(name)
  cy.get("#email").type(email)
  cy.get("#phone").type(phone)
  cy.get("#dob").type("1990-01-14")

  cy.contains('button','Submit').click()
}

describe('Website loads elements correctly', () => {

  beforeEach(() => {
    cy.visit(pageUrl)
  })

  describe("Form loading", () => {
    it('display Registration form on load', () => {
      cy.get("h2").should('have.text', 'Registration Form')
      cy.contains('Registration Form')
      cy.contains('h2','Registration Form')
    })
  
    it('display submit button on load', () => {
      cy.get("button").should('have.text', 'Submit')
      cy.contains('button','Submit').click()
    })
  })

  

  it('displays the table', () => {
    cy.get("#name").type('Jaunius')
    cy.get("#email").type('JauniusPinelis@gmail.com')

    // Action
    cy.get("button").click()

    // Assert
  })

})

describe('Submit functionality', () => {

  const name = "Jaunius";
  const email = "JauniusPinelis@gmail.com"
  const phone = "86941123"

  beforeEach(() => {
    cy.visit(pageUrl)
  })

  it('allows to fill data, submit and shows up in the table', () => {
   
    successfullSubmit(name, email, phone)

    cy.get('#infoTable tbody tr').should('have.length', 1)
    cy.get('#infoTable tbody tr')
    .first()  // Select the first row
    .find('td')  // Find all <td> elements in the first row
    .then(($tds) => {
      // Access individual cells
      const nameValue = $tds.eq(0).text(); // Get text from the first column
      const emailValue = $tds.eq(1).text(); // Get text from the second column
      const phoneValue = $tds.eq(2).text(); // Get text from the third column
  
      expect(nameValue).to.equal(name);
      expect(emailValue).to.equal(email);
      expect(phoneValue).to.equal(phone);
    });
  })

  it('submits clears data', () => {

    successfullSubmit(name, email, phone)

    cy.get("#name").should("have.text", "")
  })

  it('display submit button on load', () => {
    cy.get("button").should('have.text', 'Submit')
    cy.contains('button','Submit').click()
  })

  it('Allows to fill the data', () => {
    cy.get("#name").type('Jaunius')
    cy.get("#email").type('JauniusPinelis@gmail.com')

    // Action
    cy.get("button").click()

    // Assert
  })

})
