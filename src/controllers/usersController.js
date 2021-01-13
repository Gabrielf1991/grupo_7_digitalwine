const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../../database/models');
const { validationResult } = require ('express-validator');

// function getAllUsers(){
//     const usersFilePath = path.join(__dirname, '../data/users.json');
//     return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
// }

// function generateNewId(){
//     const products = db.User.findAll();
// 	return products.pop().id + 1;
// }

const usersController = {
    
    register: function (req, res) {
        return res.render('users/register');
    },
    store: function(req, res, next){

        const results = validationResult(req);
        
        if(!results.isEmpty()){
            return res.render("user/register", {
                errors: results.errors,
                old: req.body
            });
        }

        //const id = generateNewId();
        db.User.create({
            //id: id,
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            avatar: req.files[0].filename
        })
        

        res.redirect('users/profile/' + req.params.id);
    },

    login: function (req, res, next) {

        res.render('../views/users/login');

    },
    processLogin : async (req, res) => {

        const email= req.params.email;
        const password= req.params.password;
        const id = req.body.id;

        const existingUser = await db.User.findByPk(req.body.id);
        console.log(existingUser);
        if( existingUser.email === email){
            return req.session.userLog = existingUser;
        } else {
            res.redirect('/register')
        };
        
        // const existingUser1= users.find((user) => {
        //     return user.email === email;
        // });

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
            const user = db.User.findAll().find((user) => {
                return user.email === req.userEmail;
            });
    
            res.render ('users/profile', {
                 user
            })
        },
    list: async (req, res, next) => {
            const usersdb = await db.User.findAll();
            console.log(usersdb);
    
            res.render('users/usersdb', { usersdb })
        }
}

module.exports = usersController;