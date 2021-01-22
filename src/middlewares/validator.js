const { body } = require('express-validator');
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const db = require('../../database/models');


module.exports = {
    register: [
        body('name')
            .notEmpty()
            .withMessage('El campo Nombre es obligatorio')
            .bail()
            .isLength({min: 3})
            .withMessage('El Nombre debe tener al menos 3 caracteres')
            .bail(),
        body('last_name')
            .notEmpty()
            .withMessage('El campo Apellido es obligatorio')
            .bail()
            .isLength({min: 3})
            .withMessage('El apellido debe tener al menos 3 caracteres')
            .bail(),
        body('email')
            .notEmpty()
            .withMessage('El campo email es obligatorio')
            .bail()
            .isEmail()
            .withMessage('Email con formato incorrecto')
            .bail()
            .custom(emailValue => {
                const users = db.User.findAll();
                const userFound = users.find(user => user.email == emailValue);
                return !userFound;
            })
            .withMessage('Email ya registrado'),
        body('password')
            .notEmpty()
            .withMessage('El campo es obligatorio')
            .bail()
            .isLength({min: 6})
            .withMessage('La contraseña debe tener al menos 6 caracteres')
            .bail()
            .custom((value, { req }) => value == req.body.retype)
            .withMessage('Las contraseñas no coinciden'),
        body('retype')
            .notEmpty()
            .withMessage('Es obligatorio repetir la contraseña'),
        body('avatar')
            .custom((valueImg, { req }) => req.files[0])
            .withMessage('El avatar es obligatorio')
            .bail()
            .custom((value, { req }) => {
                const acceptedExtensions = ['.jpg', '.png', 'jpeg'];
                const fileExt = path.extname(req.files[0].originalname);
                return acceptedExtensions.includes(fileExt);
            })
            .withMessage('Extensión inválida. Las extensiones aceptadas son: JPG, PNG y JPEG')
    ],
    login:[
        body('email')
        .notEmpty()
        .withMessage('El campo email es obligatorio')
        .bail()
        .isEmail()
        .withMessage('Email con formato incorrecto')
        .bail()
        .custom((value, { req }) => {
            const allUsers = getAllUsers();
            const userFound = allUsers.find(user => value == user.email);

            if(userFound){
                if(bcrypt.compareSync(req.body.password, userFound.password)){
                    return true;
                }
                return false;
            }
            return false;
        })
        .withMessage('Email o contraseña inválidos')
    ],
    create: [
        body('name')
            .notEmpty()
            .withMessage('El campo Nombre es obligatorio')
            .bail(),
        body('price')
            .notEmpty()
            .withMessage('El campo Precio es obligatorio')
            .bail(),
        body('description')
            .notEmpty()
            .withMessage('El campo Descripción es obligatorio')
            .bail()
            .isLength({min: 20})
            .withMessage('La Descripción debe tener al menos 20 caracteres')
            .bail(),
        body('varietal')
            .notEmpty()
            .withMessage('El campo Varietal es obligatorio')
            .bail(),
        body('wine_cellar')
            .notEmpty()
            .withMessage('El campo Bodega es obligatorio'),
        body('image')
            .custom((valueImg, { req }) => req.files[0])
            .withMessage('La imagen es obligatoria')
            .bail()
            .custom((value, { req }) => {
                const acceptedExtensions = ['.jpg', '.png', 'jpeg'];
                const fileExt = path.extname(req.files[0].originalname);
                return acceptedExtensions.includes(fileExt);
            })
            .withMessage('Extensión inválida. Las extensiones aceptadas son: JPG, PNG y JPEG')
    ]
}