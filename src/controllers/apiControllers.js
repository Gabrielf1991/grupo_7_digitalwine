const { User } = require('../../database/models');

const controller = {

    dashboard : (req,res) => {

        res.json({
            products:1 
        });
    
    },
    
    list: async (req,res) => {
        
        const users = await  User.findAll({
           attributes: ['email'],
                   
        })
        
        res.json({
            meta: {
                status: 200,
                count: users.length
            }, 
            data: {
                users,
            }
        }) 
    }
}


module.exports = controller;