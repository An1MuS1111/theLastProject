const { Sequelize } = require("sequelize");
import dotenv from "dotenv";

import { User, UserAddress, UserPayment } from "../models/User";
import {
    Product,
    ProductCategory,
    ProductSubCategory,
} from "../models/Product";

dotenv.config();

// Option 1: Passing a connection URI
const sequelize = new Sequelize(process.env.DATABASE_URI, {
    dialect: "postgres",
    logging: false,
}); // Example for postgres

// Initialize models and associations
User.initModel(sequelize);
UserAddress.initModel(sequelize);
UserPayment.initModel(sequelize);

Product.initModel(sequelize);
ProductCategory.initModel(sequelize);
ProductSubCategory.initModel(sequelize);

// Set up associations
User.associate();
UserAddress.associate();
UserPayment.associate();

Product.associate();
ProductCategory.associate();
ProductSubCategory.associate();

export default sequelize;
