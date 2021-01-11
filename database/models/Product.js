const Product = (sequelize, DataTypes) => {
    const alias = 'Product';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        detail: {
            type: DataTypes.TEXT
        },
        discount: {
            type: DataTypes.DECIMAL
        },
        varietal: {
            type: DataTypes.STRING
        },
        wine_cellar: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        category_id:{
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
        tableName:'products',
        timestamps: false
    }
    
    const ProductModel = sequelize.define(alias, cols, config);
    return ProductModel;

}

module.exports = Product;