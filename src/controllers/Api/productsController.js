const { Product } = require('../../../database/models');

const controller = {
    
    productsList: async (req,res) => {
        const products = await  Product.findAll({
            attributes: ['id', 'name', 'price', 'detail', 'varietal', 'wine_cellar', 'image', 'category_id']
        })        
       const productMapped = products.map(product => {
            product.dataValues.detail = `http://localhost:3000/api/products/${product.id}`,
            product.dataValues.image = `http://localhost:3000/api/products/${product.image}`
            return product
        })
        res.json({
            meta: {
                status: 200,
                count: products.length
            }, 
            data: productMapped,            
        }) 
    },

    detail: async (req, res) => {

        const product = await Product.findByPk(req.params.id) 
        return res.json({
            meta: {
                status: 200,
            }, 
            data: product,            
        }) 
    }
}

module.exports = controller;