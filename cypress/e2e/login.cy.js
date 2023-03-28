/// <reference types="cypress" />

import loginPage from '../support/pages/login'

import shaversPage from '../support/pages/shavers'

//import data from '../fixtures/users-login.json'

describe('login', () => {

    beforeEach(()=>{
        cy.fixture('users-login').then(function(data){
            this.data = data
        })
    })

    context('quando submeto o formulário', () => {

        it.only('deve logar com sucesso', function (){

            const user = this.data

            loginPage.submit(user.email, user.password)

            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {

            const user = {
                name: 'Gerlan',
                email: 'gerlan@test.com',
                password: 'gerlan'
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)

            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {

            const user = {
                name: 'Gerlan',
                email: 'gerlan@404.com',
                password: 'gerlan'
            }

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)

            loginPage.noticeShouldBe(message)

        })

        it('campos obrigatórios', () => {

            loginPage.submit()

            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
        })

    })

    context('senha muito curta', () => {

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((senha) => {
            it(`não deve logar com a senha: ${senha}`, () => {

                loginPage.submit('galeguin@teste.com.br', senha)

                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })
    })

    context('email no formato incoreto', () => {

        const emails = [
            'galego&gmail.com',
            'galego.com.br',
            '@gmail.com',
            'papito@',
            '@',
            '12341312',
            '@#$%*()!+-{}][?^',
            'xpto1213413'
        ]

        emails.forEach((email) => {
            it(`não deve logar com o e-mail: ${email}`, () => {

                loginPage.submit(email, '123456789')

                loginPage.alertShouldBe('Informe um email válido')

            })
        })
    })
    /*
        //validação de maneira separadamente cada campo da tela de login.
    
        context('campos obrigatórios', () => {
            
            beforeEach(() => {
                loginPage.submit()
            })
    
            it('deve validar email', () => {
    
                cy.get('.alert-error')
                    .should('have.length', 2) 
                    .and(($alertError) => { 
                        
                        expect($alertError.get(0).textContent).to.equal('E-mail deve ser obrigatório')
                    })
            })
    
            it('deve validar senha', () => {
    
                cy.get('.alert-error')
                    .should('have.length', 2) 
                    .and(($alertError) => { 
                        
                        expect($alertError.get(1).textContent).to.equal('Senha é obrigatória')
                    })
            })
    
    
        })
    
        */
})