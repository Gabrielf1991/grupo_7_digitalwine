const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../../database/models');
const { validationResult } = require ('express-validator');

const usersController = {
    
    register: function (req, res) {
        return res.render('users/register');
    },
    store: function(req, res, next){

        const results = validationResult(req);
        
        if(!results.isEmpty()){
            return res.render("users/register", {
                errors: results.mapped(),
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
        

        res.redirect('/');
    },

    login: function (req, res, next) {

        res.render('../views/users/login');

    },
    processLogin : async (req, res) => {

        const results = validationResult(req);
        
        if(!results.isEmpty()){
            return res.render("users/login", {
                errors: results.mapped(),
                old: req.body
            });
        }

        const email= req.body.email;
        const password= req.body.password;

        const existingUser = await db.User.findOne({
            where:{
                email: email
            },
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
    showProfile: async (req, res) => {
            const user = await db.User.findOne({
                where:{
                    email: req.session.email
                }
            })
    
            res.render ('users/profile', {
                 user
            })
        },
    list: async (req, res, next) => {
            const usersdb = await db.User.findAll();
    
            res.render('users/usersdb', { usersdb })
        }
}

module.exports = usersController;