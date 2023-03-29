const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const Joi = require('joi')

const validator = require('express-joi-validation').createValidator({
    passError: true
})

app.use(express.json()) //api vai trabalhar com a representação JSON

const { deleteUser, insertUser } = require('./db')

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    is_shaver: Joi.boolean().required()
})

const deleteUserSchema = Joi.object({
    email: Joi.string().email().required()

})
app.get('/welcome', function (req, res) {
    res.json({ message: 'Olá QAx' })
})

app.delete('/user/:email', validator.params(deleteUserSchema), async function (req, res) {

    const { email } = req.params

    await deleteUser(email)

    res.status(204).end()

})

app.post('/user', validator.body(userSchema), async function (req, res) {

    const { name, email, password, is_shaver } = req.body

    const hashPass = await bcrypt.hash(password, 8) //criptografando a senha

    const user = {
        name: name,
        email: email,
        password: hashPass,
        is_shaver: is_shaver
    }

    // if (!user.name || !user.email || !user.password && (user.is_shaver || !user.is_shaver)) {
    //     return res.status(400).json({ message: 'Every field is mandatory.' })
    // }
    console.log(user)

    try {
        await deleteUser(user.email) //passando para deletar o usuário já nessa rota com isso não preciso chamar novamente na hora de rodar o teste

        const id = await insertUser(user)

        res.status(201).json({ user_id: id })

    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao criar o usuário!!!', message: error.detail })
        //irá retorna status 500 quando acontecer algum error e exbirá no body o retorno do banco de dados também.
    }


})

//função de interceptação das validações feitas pela biblicoteca Joi
//link da lib no npm: https://www.npmjs.com/package/express-joi-validation
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            message: err.error.toString()
        });
    } else {
        // pass on to another error handler
        next(err);
    }
});

app.listen(5000)