/// <reference types="cypress" />
describe('Forgot Password Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('[data-testid="forgot-passsword"]').click();
    });
  
    it('should display the forgot password page', () => {
      
        cy.get('[data-testid="forgot-password-form"]').should('be.visible');
        cy.get('[data-testid="email-input"]').should('be.visible');
        cy.get('button').contains('Send OTP').should('be.visible');
    });

    it('should allow the user to enter the email to get the OTP', () => {
        const email = 'test@example.com';
    
        cy.get('[data-testid="email-input"]').type(email).should('have.value', email);
    });
  
    it('should allow valid emails to get an OTP', () => {
        const validEmail = 'pavanpitiwaduge@gmail.com';

        cy.get('[data-testid="email-input"]').type(validEmail);
        cy.get('[data-testid="otp-send-button"]').click();

        cy.url().should('include', '/verify-otp');
    });

    it('should display an error message for invalid email format', () => {
        const invalidEmail = 'invalid-email';
    
        cy.get('[data-testid="email-input"]').type(invalidEmail);
        cy.get('[data-testid="otp-send-button"]').click();
    
        cy.get('[data-testid="otp-email-input-message"]').should('be.visible').contains('Invalid Email');
    });

  });