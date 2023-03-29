// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', (user) => {
    // cy.request({
    //     method: 'DELETE',
    //     url: 'http://localhost:5000/user/' + user.email

    // }).then(function (response) {
    //     expect(response.status).to.eq(204)
    // })

    //essa requisição foi comentada por que na api que construimos no método de inserção do usuario já chamo o método de deletar usuario no banco de dados.

    cy.request({
        method: 'POST',
        url: 'http://localhost:5000/user',
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })
})