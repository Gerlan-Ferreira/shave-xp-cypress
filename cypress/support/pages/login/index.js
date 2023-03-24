
class LoginPage {

    constructor(){
        this.alertError = '.alert-error'
    }

    submit(email = null, password = null) {

        cy.visit('/')

        cy.get('input[placeholder$="email"]').as('email') //garantindo que os campos email e senha vão estar presentes em tela
        cy.get('input[placeholder*="senha"]').as('password')

        if (email) {
            cy.get('@email').type(email)

        }

        if (password) {

            cy.get('@password').type(password) //o *= é um contains que procura por td que tiver esse texto. O $= é quando termina com, e o ^= é quando começa com.
        }

        cy.contains('button', 'Entrar').click()
    }

    noticeShouldBe(message) {

        cy.get('.notice-container') //box principal que contém a mensagem de error dentro. Verificamos se ele está visivel, para depois validar a mensagem.
            .should('be.visible')
            .find('.error p') //procurando pelo filho da classe inicial .notice-container e depois a mensagem.
            .should('have.text', message)
    }

    alertShouldBe(message) {

        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)

    }

    requiredFields(emailMessage, passwordMessage) {

        //essa validação deve ser usada quando tem poucos campos, quando for muitos o ideal é ser feito separadamente cada um
        cy.get(this.alertError)
            .should('have.length', 2) //validando e garantindo se os são 2 alertas, o de email e senha obrigatorios
            .and(($alertError) => { // o $ é que ele ta buscando e trazendo um elemento HTML, função essa que é do JQuery
                //função de callback que irá pegar o texto do elemento que mapeamos e depois acessando posição por posição validamos o texto.
                expect($alertError.get(0).textContent).to.equal(emailMessage)
                expect($alertError.get(1).textContent).to.equal(passwordMessage)
            })

    }

}

export default new LoginPage() //exportando a classe login já instanciada