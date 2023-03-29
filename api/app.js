const express = require('express')
const app = express()

app.use(express.json()) //api vai trabalhar com a representação JSON

const { deleteUser } = require('./db')

app.get('/welcome', function (req, res) {
    res.json({ message: 'Olá QAx' })
})

app.delete('/user/:email', async function (req, res) {

    const { email } = req.params

    await deleteUser(email)

    res.status(204).end()

})

app.listen(5000)