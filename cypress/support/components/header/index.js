class Header {

    userShouldBeLoggedIn(name) {

        cy.get('.logged-user div a')
            .should('be.visible') //validando se o usuário realmente logou com sucesso e entrou na pagina inicial
            .should('have.text', 'Olá, ' + name) //validando o texto do usuario que logou

    }
}

export default new Header()