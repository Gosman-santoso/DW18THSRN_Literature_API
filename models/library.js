"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Library extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Library.belongsTo(models.Literature, {
                as: "literature",
                foreignKey: {
                    name: "LiteratureId"
                }
            });
            Library.belongsTo(models.User, {
                as: "user",
                foreignKey: {
                    name: "UserId"
                }
            });
        }
    }
    Library.init({
        LiteratureId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: "Library"
    });
    return Library;
};