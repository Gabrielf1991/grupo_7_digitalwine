const { SSL_OP_CISCO_ANYCONNECT } = require('constants');
const fs = require('fs');
const path = require('path');
const db = require('../../database/models');
const { validationResult } = require ('express-validator');


function generateNewId(){
	const products = getAllProducts();
	return products.pop().id + 1;
}

const controller = {

    list: async (req, res) => {

        const products = await db.Product.findAll();

        res.render('products/products-list', {
            products
        });

    },
    showTintos: async (req, res) => {

        const productsTintos = await db.Product.findAll({
                where:{
                    varietal: "Tinto"
                },
            });
            res.render('products/products-tintos', {
                productsTintos
            });

    },
    showBlancos: async (req, res) => {

        const productsBlancos = await db.Product.findAll({
                where:{
                    varietal: "Blanco"
                },
            });
            res.render('products/products-blancos', {
                productsBlancos
            });

    },
    showRosados: async (req, res) => {

        const productsRosados = await db.Product.findAll({
                where:{
                    varietal: "Rosado"
                },
            });
            res.render('products/products-rosados', {
                productsRosados
            });

    },
    showEspumantes: async (req, res) => {

        const productsEspumantes = await db.Product.findAll({
                where:{
                    varietal: "Espumante"
                },
            });
            res.render('products/products-espumantes', {
                productsEspumantes
            });

    },

    detail: async (req, res) => {
        const id = req.params.id;
        const product = await db.Product.findByPk(id);
            
        res.render ('products/product-detail', {
            product
        });
    },
    create: function (req, res){
        res.render('products/product-create-form')
    },
    store: function (req, res){

        const results = validationResult(req);
        
        if(!results.isEmpty()){
            return res.render("products/product-create-form", {
                errors: results.mapped(),
                old: req.body
            });
        }

        db.Product.create({
            name: req.body.name ,
            price: req.body.price,
            detail: req.body.detail,
            discount: req.body.discount,
            varietal: req.body.varietal,
            wine_cellar: req.body.wine_cellar, 
            image: req.files[0].filename
        });
            res.redirect('/products');
    },
    edit: async (req, res) => {
        const id = req.params.id;
        const product = await db.Product.findByPk(id);

        res.render('products/product-edit-form', {
            product
        });
    },
    update: async function (req, res) {

        const id = req.params.id;
        const product = await db.Product.findByPk(id);
        console.log(req.body)
        const results = validationResult(req);
        console.log(results);
        if(!results.isEmpty()){
            return res.render("products/product-edit-form", {
                errors: results.mapped(),
                old: req.body,
                product,
            });
        }
        console.log(req.body);
        await db.Product.update({
            name: req.body.name ,
            price: req.body.price,
            detail: req.body.detail,
            discount: req.body.discount,
            varietal: req.body.varietal,
            wine_cellar: req.body.wine_cellar, 
            image: req.files[0] ? req.files[0].filename : product.image
        }, {
            where: {
                id: id
            } 
    })   
            res.redirect('/product-detail/' +  req.params.id)   
    },
    delete: function(req, res) {
        db.Product.destroy({
            where:{
                id : req.params.id
            }
        })
            res.redirect('/products');
    },
    search: async function (req, res){
        const userSearch = req.body.name;
        const searchedProduct = await db.Product.findAll(userSearch)

        res.render('products-list', {
            searchedProduct
        })
        
    }
}

module.exports = controller;