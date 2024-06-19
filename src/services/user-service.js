const UserRepository = require('../repository/user-repository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig')

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){ 
                 throw {error};
                }
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }
 
    async signIn(email, plainPassword){
        try {
            //step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step 2-> comapre incoming plain password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordsMatch){
                console.log("Passwords doesn't match");
                throw {error: "Incorrect password"}
            }
            //step 3-> If password matches
            const newJWT = this.createToken({email: user.email,id: user.id}); 
            return newJWT;
        } catch ({error}) {
            if(error.name == 'AttributeNotFound')
            {
                throw error;
            }
            console.log("Something went wrong in the signIn process")
            throw error
        }
    }

    async isAuthenticated(token){
        try {
            const isTokenVerified = this.verifyToken(token);
            if(!isTokenVerified) throw {error: "Invalid token"}
            const user = await this.userRepository.getById(isTokenVerified.id);
            if(!user) throw {error: "No user with the corresponding token exist"}
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn: '1d'})
            return result
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw {error}
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation");
            throw {error}
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in the password comparison")
            throw error;
        }
    }

    isUserwithRole(userId, userRole){
        try {
            return this.userRepository.isUserwithRole(userId, userRole);
        } catch (error) {
            console.log("Something went wrong in the service layer")
            throw error;
        }
    }
}

module.exports = UserService