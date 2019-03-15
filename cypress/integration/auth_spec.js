/// <reference types="Cypress" />

describe('Authentication page', () => {
  describe('Signup page', () => {
    beforeEach(() => {
      cy.visit('/auth/signup');
    });
    it('should render the signup page successfully', () => {
      cy.get('h1', { timeout: 5000 }).should('contain', 'Create an account!');
    });

    it('should focus the email field to load the page', () => {
      cy.focused({ timeout: 5000 }).should(
        'have.attr',
        'data-cy',
        'signup-email',
      );
    });

    it('should create a user and redirect to home page', () => {
      cy.get('[data-cy=signup-email]', { timeout: 5000 }).type(
        `user_random_${Math.random()}_${new Date().getTime()}`,
      );
      cy.get('[data-cy=signup-password]', { timeout: 5000 }).type('123123123');
      cy.get('[data-cy=signup-submit]', { timeout: 5000 }).click();
      cy.location().should(loc => {
        expect(loc.pathane).to.eq('/');
      });
    });
  });
});
