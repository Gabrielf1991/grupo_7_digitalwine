const fs = require('fs');
const path = require('path');


function writeProducts(productsToSave){
	const productsToStringify = JSON.stringify(productsToSave, null, ' ');
	return fs.writeFileSync('./src/data/productsDataBase.json', productsToStringify);
	
}

function generateNewId(){
	const products = getAllProducts();
	return products.pop().id + 1;
}

const controller = {
    index: (req, res) => {
        const products = getAllProducts();

        res.render('products/products-list', {
            products: products,
        });

    },
    detail: (req, res) => {
        const id = req.params.id;
        const products = getAllProducts();
        const result = products.find((product) => {
            return product.id == id
        })

        res.render ('products/product-detail', {
            product: result
        })
    },
    edit: (req, res) => {
        const products = getAllProducts();
		const id = req.params.id;
		const result = products.find((product) => {
			return product.id == id
        })
        console.log(result);
        res.render('products/product-edit-form', {
			productToEdit: result
		})
    },
    update: (req, res) => {
        const products = getAllProducts();
        const id = req.params.id;

        const editedProducts = products.map(function(product){
            if (product.id == id){
                product.name = req.body.name;
                product.price = req.body.price;
                product.bodega = req.body.bodega;
                product.category = req.body.category;
                product.description = req.body.description;
                product.image = "" //req.files[0] ? req.files[0].filename : product.image
            }
            console.log(product);
            return product;

            
        }) 

        writeProducts(editedProducts);
        res.redirect('/product-detail/' + id)
    },
}

module.exports = controller;