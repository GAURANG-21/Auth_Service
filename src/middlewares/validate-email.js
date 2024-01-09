const emailValidator = require('deep-email-validator')

const verify = async(req,res,next)=>{
    const response = await emailValidator.validate(req.body.email)
    if(!response.valid){
        return res.status(500).json({
            data: {},
            success: false,
            message: "Invalid email",
            err: response.reason
        })
    }

    next();
}

module.exports = {
    verify
}