/// <reference types="cypress" />
describe('Project Settings page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        const validEmail = 'pavanpitiwaduge@gmail.com';
        const validPassword = 'abc';

        cy.get('[data-testid="email-input"]').type(validEmail);
        cy.get('[data-testid="password-input"]').type(validPassword);
        cy.get('[data-testid="login-button"]').click();

    });

    it('should allow the user to create new projects', () => {
        cy.get('[data-testid="new-project-button"]').click();
        cy.get('[data-testid="create-project-dialog"]').should('be.visible');
        cy.get('[data-testid="project-name-input"]').type('New Project');
        cy.get('[data-testid="project-description-input"]').type('This is a new project');
        cy.get('[data-testid="create-project-button"]').click();   
    });
    
    /*it('should list the newly created project under users projects', () => {
        cy.get('[data-testid="project-list"]').should('be.visible');
        cy.get('[data-testid="project-list-item-name"]').contains('New Project');
        cy.get('[data-testid="project-list-item-description"]').contains('This is a new project');
    });

    it('should allow the user to edit project settings', () => {
        cy.get('[data-testid="edit-project-button"]').click();
        cy.get('[data-testid="project-name-input"]').type('New Project');
        cy.get('[data-testid="project-description-input"]').type('This is a new project');
        cy.get('[data-testid="edit-project-button"]').click();   
    });*/
});