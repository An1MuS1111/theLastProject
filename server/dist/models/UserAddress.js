"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddress = void 0;
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
class UserAddress extends sequelize_1.Model {
    static initModel(sequelize) {
        UserAddress.init({
            id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
            address_line1: sequelize_1.DataTypes.STRING,
            address_line2: sequelize_1.DataTypes.STRING,
            city: sequelize_1.DataTypes.STRING,
            postal_code: sequelize_1.DataTypes.STRING,
            country: sequelize_1.DataTypes.STRING,
            telephone: sequelize_1.DataTypes.STRING,
            mobile: sequelize_1.DataTypes.STRING,
        }, { sequelize, modelName: 'UserAddress', underscored: true, timestamps: false });
    }
    static associate() {
        UserAddress.belongsTo(User_1.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    }
}
exports.UserAddress = UserAddress;
//# sourceMappingURL=UserAddress.js.map