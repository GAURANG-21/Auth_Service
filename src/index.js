const express = require('express');
const {PORT} = require('./config/serverConfig');
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index')
const app = express();
// const {User} = require('./models/index')
// const bcrypt = require('bcrypt');
// const UserRepository = require('./repository/user-repository')
const UserService = require('./services/user-service')

const prepareAndStartServer = ()=>{

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use('/api',apiRoutes)

    app.listen(PORT, async()=>{
        console.log(`Server Started on Port:${PORT}`)

        // const incomingPassword = "123455548"
        // const user = await User.findByPk(3);
        // const response = bcrypt.compareSync(incomingPassword, user.password);
        // console.log(response)

        // const userRepository = new UserRepository();
        // const user = await userRepository.getById(2);
        // console.log(user.dataValues)

        const userService = new UserService();
        // const newToken = userService.createToken({email:"gaurang@gmail.com", id:"1"})
        // console.log("New token is:",newToken)

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhdXJhbmdAZ21haWwuY29tIiwiaWQiOiIxIiwiaWF0IjoxNzA0Mzg5MDY0LCJleHAiOjE3MDQzODkwNjR9.ka-WYutBS-xYAP6cmQ-sdNCycNYQqivWAwaKBY6XUIg'
        // const response = userService.verifyToken(token)
        // console.log(response)
    })
}

prepareAndStartServer();