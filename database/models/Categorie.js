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
        tableName:'categories',
        timestamps: false
    }
    
    const CategorieModel = sequelize.define(alias, cols, config);
    return CategorieModel;

}

module.exports = Categorie;