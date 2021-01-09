const UserProduct = (sequelize, DataTypes) => {
    const alias = 'UserProduct';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATETIME
        },
        updated_at: {
            type: DataTypes.DATETIME
        },
        deleted_at: {
            type: DataTypes.DATETIME
        }
    };

    const config = {
        tableName:'user_products',
        timestamps: false
    }
    
    const UserProductModel = sequelize.define(alias, cols, config);
    return UserProductModel;

}

module.exports = UserProduct;