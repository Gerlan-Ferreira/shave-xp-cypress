const { Pool } = require('pg')

const dbConfig = {
    host: 'motty.db.elephantsql.com',
    user: 'hdnmmmlz',
    password: 'EgEV7RcoKpsZjZN2YdXq1GtsbbRHLgHm',
    database: 'hdnmmmlz',
    port: 5432
}

const pool = new Pool(dbConfig)

async function deleteUser(email) {

    await pool.query('DELETE FROM users WHERE email = $1', [email])

}

module.exports = {
    deleteUser
}