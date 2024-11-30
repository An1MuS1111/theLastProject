"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPayment = void 0;
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
class UserPayment extends sequelize_1.Model {
    static initModel(sequelize) {
        UserPayment.init({
            id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
            payment_type: sequelize_1.DataTypes.STRING,
            provider: sequelize_1.DataTypes.STRING,
            account_no: sequelize_1.DataTypes.INTEGER,
            expiry: sequelize_1.DataTypes.DATE,
        }, { sequelize, modelName: 'UserPayment', underscored: true, timestamps: false });
    }
    static associate() {
        UserPayment.belongsTo(User_1.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    }
}
exports.UserPayment = UserPayment;
//# sourceMappingURL=UserPayment.js.map