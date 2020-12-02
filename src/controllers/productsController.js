const fs = require('fs');
const path = require('path');

function getAllProducts(){
    const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

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
        
    },
    
    create: (req, res) => {

        res.render('product-create-form');
    },
    
    store: (req, res, next) => {

        const newProduct = {
			id: generateNewId(),
			name:req.body.name,
			price:req.body.price ,
            description:req.body.description,
            bodega: req.body.bodega,
            // image: "" //

		}
		const products = getAllProducts();
		const productsToSave = [...products, newProduct];
		writeProducts(productsToSave);

		res.redirect('/');

    },
    edit: (req, res, next) => {
        

        
    },
    update: (req, res, next) => {
       
				// product.image = re.files[0] ? req.files[0].filename : product.image; //
			},
    destroy: (req, res, next) => {

        
    }

}

module.exports = controller;