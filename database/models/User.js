const User = (sequelize, DataTypes) => {
    const alias = 'User';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.TEXT
        },
        dob: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        rol: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        },
        deleted_at: {
            type: DataTypes.DATE
        }
    };

    const config = {
        tableName:'users',
        timestamps: false
    }
    
    const UserModel = sequelize.define(alias, cols, config);

    UserModel.associate = function(models){
    UserModel.belongsToMany(models.Product, {
        as: 'productos',
        through: 'user_products',
        foreignKey: 'user_id',
        otherKey: 'product_id',
        timestamps: false
    })
    }
    return UserModel;

}

module.exports = User;

