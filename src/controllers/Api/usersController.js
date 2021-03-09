const { User } = require('../../../database/models');

const controller = {
    
    usersList: async (req,res) => {
        const users = await  User.findAll({
            attributes: ['id', 'name', 'last_name', 'email', 'avatar']
        })        
       const userMapped = users.map(user => {
            user.dataValues.detail = `http://localhost:3000/api/users/${user.id}`,
            user.dataValues.avatar = `http://localhost:3000/api/users/${user.avatar}`
            return user
        })
        res.json({
            meta: {
                status: 200,
                count: users.length
            }, 
            data: userMapped,            
        }) 
    },

    detail: async (req, res) => {

        const user = await User.findByPk(req.params.id) 
        return res.json({
            meta: {
                status: 200,
            }, 
            data: user,            
        }) 
    }
}

module.exports = controller;