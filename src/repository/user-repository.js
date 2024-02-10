const {User, Role} = require('../models/index');
const ValidationError = require('../utils/validation-error');

class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                throw new ValidationError(error)
            }
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            })
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer")
            throw {error}
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes: ["email",'id']
            });
            //This will return the username and password.
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer.")
            throw {error}
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error}
        }
    }

    async isUserwithRole(userId, userRole){
        try {
            console.log(userRole)
            const user = await User.findByPk(userId);
            const role = await Role.findOne({
                where: {
                    name : userRole
                }
            });
            return user.hasRole(role);
        } catch (error) {
            console.log("Something went wrong in the repository layer")
            console.log(error)
            throw error;
        }
    }
}

module.exports = UserRepository