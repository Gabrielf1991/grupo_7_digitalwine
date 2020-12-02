const fs = require('fs');
const path = require('path');

function getAllProducts(){
    const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}


const controller = {
    
    index: (req, res) => {
       res.render('index');

    },
    search: (req, res) => {
        const products = getAllProducts();
        const searched = req.query.keywords;
        const foundProduct = products.filter(product => product.name.toLowerCase().includes(searched))

        res.render('./products/results', {
            products: foundProduct
        })
    },
};

module.exports = controller;