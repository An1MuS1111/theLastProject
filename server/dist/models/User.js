"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const UserAddress_1 = require("./UserAddress");
const UserPayment_1 = require("./UserPayment");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: sequelize_1.DataTypes.STRING,
            name: sequelize_1.DataTypes.STRING,
            telephone: sequelize_1.DataTypes.STRING,
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            modified_at: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            is_admin: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
        }, {
            sequelize,
            modelName: "User",
            underscored: true,
            timestamps: false,
        });
    }
    static associate() {
        User.hasMany(UserAddress_1.UserAddress, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        });
        User.hasMany(UserPayment_1.UserPayment, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map