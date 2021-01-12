const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt');
const db = require('../../database/models');

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

        
        const id = generateNewId();
        db.User.create({
            id: id,
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            avatar: req.files[0].filename
        })
        

        res.redirect('users/profile/' + id);
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
    list: async (req, res, next) => {
            const usersdb = await db.User.findAll();
    
            res.render('users/usersdb', { usersdb })
        }
}

module.exports = usersController;