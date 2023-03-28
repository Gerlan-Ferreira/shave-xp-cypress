/// <reference types="cypress" />

import loginPage from '../support/pages/login'

import shaversPage from '../support/pages/shavers'

import data from '../fixtures/users-login.json'
import { use } from 'chai'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {

            // dado que eu tenho um NOVO usuário
            const user = data.success

            cy.request({
                method: 'POST',
                url: 'http://localhost:3333/users',
                body: user
            }).then(function(response){
                expect(response.status).to.eq(201)
            })

            // quando submeto o form de login com esse usuário
            loginPage.submit(user.email, user.password)

            // então devo ser logado com sucesso
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {

            const user = data.invpass

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.submit(user.email, user.password)

            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {

            const user = data.email404

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

        data.shortpass.forEach((senha) => {
            it(`não deve logar com a senha: ${senha}`, () => {

                loginPage.submit('galeguin@teste.com.br', senha)

                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })
    })

    context('email no formato incoreto', () => {

        data.invemails.forEach((email) => {
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