const Categorie = (sequelize, DataTypes) => {
    const alias = 'Categorie';
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
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
        tableName:'categories',
        timestamps: false
    }
    
    const CategorieModel = sequelize.define(alias, cols, config);

    CategorieModel.associate = function(models) {
        CategorieModel.hasMany(models.Product, {
            as: 'productos',
            foreignKey: 'category_id'
        })
    }
    return CategorieModel;

}

module.exports = Categorie;