const { User, Product } = require('../../database/models');

const controller = {
    
    productsList : async (req,res) => {
        const products = await Product.findAll({
            attributes: ['id','name', 'detail']
        }) 
        res.json({
            meta: {
                status: 200,
                count: products.length
            }, 
            data: products,
        });   
    },
    
    usersList: async (req,res) => {
        const users = await  User.findAll({
            attributes: ['id', 'name', 'last_name', 'email']
        })        
        res.json({
            meta: {
                status: 200,
                count: users.length
            }, 
            data: users,            
        }) 
    }
}

module.exports = controller;