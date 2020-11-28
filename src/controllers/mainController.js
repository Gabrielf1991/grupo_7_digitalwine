const fs = require('fs');
const path = require('path');

function getAllProducts(){
    const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}


const controller = {
    index: (req, res) => {
        const products = getAllProducts();

        res.render('products/products-list', {
            products: products,
        });
    },
    search: (req, res) => {
        const searched = req.query.keywords;
        const products = getAllProducts();
        const foundProduct = products.filter(product => product.name.toLowerCase().includes(searched))

        res.render('results', {
            product: foundProduct
        })
    },
};

module.exports = controller;