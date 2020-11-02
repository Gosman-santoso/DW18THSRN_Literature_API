'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NewLiterature extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            NewLiterature.belongsTo(models.NewUser, {
                as: "user_id",
                foreignKey: {
                    name: "userId"
                }
            });
            NewLiterature.hasMany(models.NewLibrary, {
                as: "library"
            })
        }
    };
    NewLiterature.init({
        title: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        publication_date: DataTypes.DATE,
        pages: DataTypes.STRING,
        ISBN: DataTypes.STRING,
        author: DataTypes.STRING,
        status: DataTypes.STRING,
        file: DataTypes.STRING,
        thumbnail: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'NewLiterature',
    });
    return NewLiterature;
};