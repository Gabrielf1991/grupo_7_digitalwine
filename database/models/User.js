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
        tableName:'users',
        timestamps: false
    }
    
    const UserModel = sequelize.define(alias, cols, config);
    return UserModel;

}

module.exports = User;