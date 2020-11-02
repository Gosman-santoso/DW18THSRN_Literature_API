'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('NewLiteratures', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "NewUsers",
                    key: "id"
                },
                onUpdate: "SET NULL",
                onDelete: "CASCADE"
            },
            publication_date: {
                type: Sequelize.DATE
            },
            pages: {
                type: Sequelize.STRING
            },
            ISBN: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            file: {
                type: Sequelize.STRING
            },
            thumbnail: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('NewLiteratures');
    }
};