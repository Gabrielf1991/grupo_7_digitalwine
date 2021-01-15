const fs = require('fs');
const path = require('path');
const db = require('../../database/models');



 module.exports = (req, res, next) => {

    if(!req.session.email && req.cookies.email){
        db.User.findOne({
            where:{
                email: req.cookies.email
            }
        })
        .then((userToLogin) => {
            req.session.userLog = userToLogin;
            return next();
        })


        
    } else { 

    return next();

    }
}