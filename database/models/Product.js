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
        tableName:'products',
        timestamps: false
    }
    
    const ProductModel = sequelize.define(alias, cols, config);

    ProductModel.associate = function(models){
        ProductModel.belongsTo(models.Categorie, {
            as: 'categorias',
            foreignKey: 'category_id'
        })
        ProductModel.belongsToMany(models.User, {
            as: 'usuarios',
            through: 'user_products',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: false
        })
    }
    return ProductModel;

}

module.exports = Product;