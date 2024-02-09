const userRoleVerifier = (req, res, next)=>{
    if(!req.body.userId && !req.body.userRole) 
    return res.status(500).json({
        data: {},
        success: false,
        message: "No userId and userRole",
    })

    if(!req.body.userId)
    return res.status(500).json({
        data: {},
        success: false,
        message: "No userId",
    })

    if(!req.body.userRole)
    return res.status(500).json({
        data: {},
        success: false,
        message: "No userRole",
    })

    const role = req.body.userRole.toUpperCase();
    if(role!="ADMIN" && role!="CUSTOMER" && role!="AIRLINE_BUSINESS")
    return res.status(500).json({
        data:{},
        success: false,
        message: "No such role exists"
    })

    next();
}

module.exports = {
    userRoleVerifier
}