const express = require('express');
const {PORT} = require('./config/serverConfig');
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index')
const app = express();
// const {User} = require('./models/index')
// const bcrypt = require('bcrypt');
// const UserRepository = require('./repository/user-repository')
// const UserService = require('./services/user-service')
// const db = require('./models/index')
const {User,Role} = require('./models/index')

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

        // const userService = new UserService();
        // const newToken = userService.createToken({email:"gaurang@gmail.com", id:"1"})
        // console.log("New token is:",newToken)

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhdXJhbmdAZ21haWwuY29tIiwiaWQiOiIxIiwiaWF0IjoxNzA0Mzg5MDY0LCJleHAiOjE3MDQzODkwNjR9.ka-WYutBS-xYAP6cmQ-sdNCycNYQqivWAwaKBY6XUIg'
        // const response = userService.verifyToken(token)
        // console.log(response)

        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({alter:true})
        // }

        // const u1 = await User.findByPk(2);
        // const r1 = await Role.findByPk(2);
        // u1.addRole(r1);
        // r1.addUser(u1)
        // const response= await u1.getRoles();
        // const response_role = await r1.getUsers();
        // console.log(response)
        // console.log(response_role)
        // const u1 = await User.findByPk(2);
        // const roles = await u1.getRoles();
        // console.log(roles)
    })
}

prepareAndStartServer();