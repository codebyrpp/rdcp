describe('Login page', () => {

  //beforeEach
  it('should display the login page', () => {
    cy.visit('http://localhost:5173/login');
    
    cy.get('[data-testid="login-form"]').should('be.visible');

    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    
    cy.get('[data-testid="login-button"]').should('be.visible');
  })

  it('should allow the user to enter email and password', () => {
    cy.visit('http://localhost:5173/login');
    
    const email = 'test@example.com';
    const password = 'password123';

    cy.get('[data-testid="email-input"]').type(email).should('have.value', email);
    cy.get('[data-testid="password-input"]').type(password).should('have.value', password);
  });

  it('should allow authorized users to login', () => {
    cy.visit('http://localhost:5173/login');
    
    const validEmail = 'pavanpitiwaduge@gmail.com';
    const validPassword = 'abc';

    cy.get('[data-testid="email-input"]').type(validEmail);
    cy.get('[data-testid="password-input"]').type(validPassword);
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('include', '/projects');

  });

  it('should display an error message for invalid credentials', () => {
    cy.visit('http://localhost:5173/login');
    
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'wrongpassword';

    cy.get('[data-testid="email-input"]').type(invalidEmail);
    cy.get('[data-testid="password-input"]').type(invalidPassword);
    cy.get('[data-testid="login-button"]').click();

    // Check if the error message is displayed
    cy.get('[data-testid="error-message"]').should('be.visible').and('contain', 'Invalid Credentials');
  });

  it('should display an error message for invalid email format', () => {
    cy.visit('http://localhost:5173/login');
    
    const invalidEmail = 'invalid-email';
    const validPassword = 'password123';

    cy.get('[data-testid="email-input"]').type(invalidEmail);
    cy.get('[data-testid="password-input"]').type(validPassword);
    cy.get('[data-testid="login-button"]').click();

    // Check if the email format error message is displayed
    cy.get('[data-testid="email-input-message"]').should('be.visible').and('contain', 'Invalid Email');
  });

  it('should display an error message for empty password', () => {
    cy.visit('http://localhost:5173/login');
    
    const validEmail = 'test@example.com';
    const emptyPassword = '';

    cy.get('[data-testid="email-input"]').type(validEmail);
    cy.get('[data-testid="password-input"]').type(emptyPassword);
    cy.get('[data-testid="login-button"]').click();

    // Check if the password required error message is displayed
    cy.get('[data-testid="error-message"]').should('be.visible').and('contain', 'Password is required');
  });
  
})

