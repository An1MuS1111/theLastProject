"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const UserAddress_1 = require("../models/UserAddress");
const UserPayment_1 = require("../models/UserPayment");
dotenv_1.default.config();
const sequelize = new Sequelize(process.env.DATABASE_URI, {
    dialect: 'postgres',
    logging: false,
});
User_1.User.initModel(sequelize);
UserAddress_1.UserAddress.initModel(sequelize);
UserPayment_1.UserPayment.initModel(sequelize);
User_1.User.associate();
UserAddress_1.UserAddress.associate();
UserPayment_1.UserPayment.associate();
exports.default = sequelize;
//# sourceMappingURL=database.js.map