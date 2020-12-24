const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt')

function getAllUsers(){
    const usersFilePath = path.join(__dirname, '../data/users.json');
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

function generateNewId(){
    const products = getAllUsers();
	return products.pop().id + 1;
}

const usersController = {
    
    register: function (req, res) {
        return res.render('users/register');
    },
    store: function(req, res, next){

        const usersJSON = fs.readFileSync('src/data/users.json', { encoding: 'utf-8'});
        let users;
        console.log(usersJSON)
        if (usersJSON == '') {
            users = [];
        } else {
            users = JSON.parse(usersJSON);
        }
        
        const user = {
            id: generateNewId(),
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            avatar: req.files[0].filename
        };
        
        
        users.push(user);
        const newusersJSON = JSON.stringify(users, null, ' ');
        fs.writeFileSync('src/data/users.json', newusersJSON);

        return res.render('../views/index');
    },

    login: function (req, res, next) {

        res.render('../views/users/login');

    },
    processLogin : function (req, res) {

        const email= req.body.email;
        const password= req.body.password;
        const users= getAllUsers();

        const existingUser= users.find((user) => {
            return user.email === email;
        });

        if(existingUser && bcrypt.compareSync(password, existingUser.password)) {

            if (req.body.recordarme) {
                res.cookie('email', email, { maxAge:3600000 })
            }

            req.session.email = email;
            
            return res.redirect('/');
        }
           res.redirect('/register')
        },
    showProfile: (req, res) => {
            const user = getAllUsers().find((user) => {
                return user.email === req.userEmail;
            });
    
            res.render ('users/profile', {
                userToShow: user
            })
        },
}

module.exports = usersController;