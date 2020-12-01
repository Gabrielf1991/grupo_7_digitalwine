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
        const id = req.params.id;
        const products = getAllProducts();
        const result = products.find((product) => {
            return product.id == id
        })

        res.render ('products/product-detail', {
            product: result
        })
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
        const products = getAllProducts();
		const id = req.params.id;
		const result = products.find((product) => product.id == id)

		res.render('product-edit-form', {
			productToEdit : result
		})

        
    },
    update: (req, res, next) => {
        const products =getAllProducts();
		const id = req.params.id;
		const newProduct = products.map((product) => { 

			if(id == product.id){
				product.name = req.body.name;
				product.price = req.body.price;
				product.description = req.body.description;
				// product.image = re.files[0] ? req.files[0].filename : product.image; //
			}

			return product
		})
		writeProducts(newProduct);

		res.redirect('/products/product-detail/' + id);

        
    },
    destroy: (req, res, next) => {

        
    }

}

module.exports = controller;