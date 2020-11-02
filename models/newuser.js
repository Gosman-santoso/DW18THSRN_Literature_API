'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NewUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            NewUser.hasMany(models.NewLiterature, {
                as: "literature"
            });
            NewUser.hasMany(models.NewLibrary, {
                as: "library"
            })
        }
    };
    NewUser.init({
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        gender: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        avatar: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'NewUser',
    });
    return NewUser;
};