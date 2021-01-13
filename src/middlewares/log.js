const fs = require('fs');
const path = require('path');
const db = require('../../database/models');



 module.exports = (req, res, next) => {

    if(!req.session.userLog && req.cookies.user){

        const id = req.params.id;
        const users = db.User.findByPk(id);

        console.log(users);


        
        const userToLogin = db.User.findAll( user => req.cookies.user == user.id);
        req.session.userLog = userToLogin;
    }
    return next();
}