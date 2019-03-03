/// <references types="cypress" >

describe('Authentication page', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  describe('Signup page', () => {
    it('should render the signup page successfully', () => {
      cy.get('h1', { timeout: 2000 }).should('contain', 'Create an account!');
    });
  });
});
