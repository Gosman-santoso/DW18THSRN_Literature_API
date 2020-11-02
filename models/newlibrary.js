'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NewLibrary extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            NewLibrary.belongsTo(models.NewLiterature, {
                as: "literature",
                foreignKey: {
                    name: "literatureId"
                }
            });
            NewLibrary.belongsTo(models.NewUser, {
                as: "user",
                foreignKey: {
                    name: "userId"
                }
            });
        }
    };
    NewLibrary.init({
        literatureId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'NewLibrary',
    });
    return NewLibrary;
};