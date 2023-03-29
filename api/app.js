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

    if (!user.name || !user.email || !user.password && (user.is_shaver || !user.is_shaver)) {
        return res.status(400).json({ message: 'Every field is mandatory.' })
    }
    console.log(user)

    try {
        await deleteUser(user.email) //passando para deletar o usuário já nessa rota com isso não preciso chamar novamente na hora de rodar o teste
        const id = await insertUser(user)

        res.status(201).json({ user_id: id })

    } catch (error) {
        res.status(500).json({error: 'Ocorreu um erro ao criar o usuário!!!', message: error.detail}) 
        //irá retorna status 500 quando acontecer algum error e exbirá no body o retorno do banco de dados também.
    }


})

app.listen(5000)