const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json()) //api vai trabalhar com a representação JSON

const { deleteUser, insertUser } = require('./db')

app.get('/welcome', function (req, res) {
    res.json({ message: 'Olá QAx' })
})

app.delete('/user/:email', async function (req, res) {

    const { email } = req.params

    await deleteUser(email)

    res.status(204).end()

})

app.post('/user', async function (req, res) {

    const { name, email, password, is_shaver } = req.body

    const hashPass = await bcrypt.hash(password, 8) //criptografando a senha

    const user = {
        name: name,
        email: email,
        password: hashPass,
        is_shaver: is_shaver
    }

    console.log(user)

    const id = await insertUser(user)

    res.status(201).json({ user_id: id })

})

app.listen(5000)