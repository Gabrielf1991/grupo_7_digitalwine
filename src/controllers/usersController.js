const fs = require('fs');
const path = require('path');


const usersController = {
    register: function (req, res) {
        return res.render('register');
    },
    store: function(req, res){
        let usersJSON = fs.readFileSync('users.json', { encoding: 'utf-8'});
        let users;
        if (usersJSON == '') {
            users = [];
        } else {
            users.JSON.parse(usersJSON);
        }

        let user = {
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            age:req.body.age
        };

        users.push(user)
        usersJSON = JSON.stringify(users);
        fs.writeFileSync('users.json', usersJSON);

        return res.render('success');
    }
}

module.exports = usersController;