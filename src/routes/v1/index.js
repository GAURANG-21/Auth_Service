const express = require('express');
const UserController = require('../../controllers/user-controller')
const {AuthRequestValidator, EmailValidator, UserRoleVerifier} = require('../../middlewares/index')
const router = express.Router();

router.post('/signup',
            AuthRequestValidator.validateUserAuth,
            UserController.create)
            
router.post('/signin', 
            AuthRequestValidator.validateUserAuth,
            // EmailValidator.verify,
            UserController.signIn)

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)

router.get(
    '/isUserwithRole',
    UserRoleVerifier.userRoleVerifier,
    UserController.isUserwithRole
)

module.exports = router