/// <reference types="cypress" />

describe('Login page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display the login page', () => {
    cy.get('[data-testid="login-form"]').should('be.visible');
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });

  it('should allow the user to enter email and password', () => {
    const email = 'test@example.com';
    const password = 'password123';

    cy.get('[data-testid="email-input"]').type(email).should('have.value', email);
    cy.get('[data-testid="password-input"]').type(password).should('have.value', password);
  });

  it('should allow authorized users to login', () => {
    const validEmail = 'pavanpitiwaduge@gmail.com';
    const validPassword = 'abc';

    cy.get('[data-testid="email-input"]').type(validEmail);
    cy.get('[data-testid="password-input"]').type(validPassword);
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/projects');
  });

  it('should display an error message for invalid email format', () => {
    const invalidEmail = 'invalid-email';
    const validPassword = 'password123';

    cy.get('[data-testid="email-input"]').type(invalidEmail);
    cy.get('[data-testid="password-input"]').type(validPassword);
    cy.get('[data-testid="login-button"]').click();

    // Check if the email format error message is displayed
    cy.get('[data-testid="email-input-message"]').should('be.visible').and('contain', 'Invalid Email');
  });

  it('should display an error message for empty password', () => {
    const validEmail = 'test@example.com';

    cy.get('[data-testid="email-input"]').type(validEmail);
    cy.get('[data-testid="login-button"]').click();

    // Check if the password required error message is displayed
    cy.get('[data-testid="password-input-message"]').should('be.visible').and('contain', 'Password is required');
  });

  it('should display an error message for invalid credentials', () => {
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'wrongpassword';

    cy.get('[data-testid="email-input"]').type(invalidEmail);
    cy.get('[data-testid="password-input"]').type(invalidPassword);
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="invalid-credentials-message"]').should('be.visible');
  });

  it('should allow the user to reset the password', () => {
    cy.get('[data-testid="forgot-passsword"]').click();

    cy.url().should('include', '/forgot-password');
  });

});