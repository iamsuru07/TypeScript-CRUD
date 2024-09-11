"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    class Post extends sequelize_1.Model {
    }
    Post.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        content: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now'),
        },
        updated_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now'),
        },
    }, {
        sequelize,
        tableName: 'posts_data',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
        timestamps: true,
    });
    return Post;
}
