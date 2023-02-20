/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Funcionalidade Pré Cadastro', () => {
    
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve completar o pré cadastro com sucesso', () => {
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let emailFaker = faker.internet.email(nomeFaker)

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('!teste@teste')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobrenomeFaker)
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });

    it('Deve completar o pré-cadastro com sucesso usando Comandos customizados', () => {
        let nomeFaker2 = faker.name.firstName()
        let emailFaker2 = faker.internet.email(nomeFaker2)

        cy.preCadastro(emailFaker2, 'senha!@#forte', 'Aluno', 'Ebac')

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });
});