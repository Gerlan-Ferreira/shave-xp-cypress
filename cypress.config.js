const { defineConfig } = require("cypress");

const { Pool } = require('pg')

const dbConfig = {
  host: 'motty.db.elephantsql.com',
  user: 'hdnmmmlz',
  password: 'EgEV7RcoKpsZjZN2YdXq1GtsbbRHLgHm',
  database: 'hdnmmmlz',
  port: 5432
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        removeUser(email) {

          //essa promise foi criada para que ao chavar o evento no teste não ocorresse erro por conta de sequencia de execução das funções no cypress
          //dessa forma ele só vai para a segunda step/passo quando o que está usando essa promessa for resolvido seja com sucesso ou erro.
          return new Promise(function (resolve) {
            const pool = new Pool(dbConfig)

            pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {

              if (error) {
                throw error
              }
              resolve({ success: result })
            })

          })

        }

      })
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'http://localhost:3000'
  },
});
