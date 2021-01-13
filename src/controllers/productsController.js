const { SSL_OP_CISCO_ANYCONNECT } = require('constants');
const fs = require('fs');
const path = require('path');
const db = require('../../database/models')

//function getAllProducts(){
//    const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//}

// function writeProducts(productsToSave){
// 	const productsToStringify = JSON.stringify(productsToSave, null, ' ');
// 	return fs.writeFileSync('./src/data/productsDataBase.json', productsToStringify);
// }

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
    update: function (req, res) {
        db.Product.update({
            name: req.body.name ,
            price: req.body.price,
            detail: req.body.detail,
            discount: req.body.discount,
            varietal: req.body.varietal,
            wine_cellar: req.body.wine_cellar, 
            image: req.files[0] ? req.files[0].filename : product.image
        }, {
            where: {
                id: req.params.id
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