/// <reference types="cypress" />

describe('login', ()=> {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {

            const user = {
                name: 'Gerlan',
                email: 'gerlan@test.com',
                password: 'gerlan@123'
            }
    
            cy.visit('http://localhost:3000')

            cy.get('input[placeholder$="email"]').type(user.email)

            cy.get('input[placeholder*="senha"]').type(user.password) //o *= é um contains que procura por td que tiver esse texto. O $= é quando termina com, e o ^= é quando começa com.

            cy.contains('button', 'Entrar').click()

            cy.get('.logged-user div a')
            .should('be.visible') //validando se o usuário realmente logou com sucesso e entrou na pagina inicial
            .should('have.text', 'Olá, ' + user.name) //validando o texto do usuario que logou
        })

        it('não deve logar com senha incorreta', () =>{

            const user = {
                name: 'Gerlan',
                email: 'gerlan@test.com',
                password: 'gerlan'
            }
            
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            cy.visit('http://localhost:3000')

            cy.get('input[placeholder$="email"]').type(user.email)

            cy.get('input[placeholder*="senha"]').type(user.password) 

            cy.contains('button', 'Entrar').click()

            cy.get('.notice-container') //box principal que contém a mensagem de error dentro. Verificamos se ele está visivel, para depois validar a mensagem.
            .should('be.visible')
            .find('.error p') //procurando pelo filho da classe inicial .notice-container e depois a mensagem.
            .should('have.text', message)

        })

        it('não deve logar com email não cadastrado', ()=> {

            const user = {
                name: 'Gerlan',
                email: 'gerlan@404.com',
                password: 'gerlan'
            }
            
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            cy.visit('http://localhost:3000')

            cy.get('input[placeholder$="email"]').type(user.email)

            cy.get('input[placeholder*="senha"]').type(user.password) 

            cy.contains('button', 'Entrar').click()

            cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)


        })

    })
})