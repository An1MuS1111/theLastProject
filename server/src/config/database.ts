const { Sequelize } = require("sequelize");
import dotenv from "dotenv";

import { User, UserAddress, UserPayment } from "../models/User";
import {
    Product,
    ProductCategory,
    ProductSubCategory,
} from "../models/Product";
import { PaymentMethod, CardDetail, PayPalDetail } from "../models/Payment";

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

PaymentMethod.initModel(sequelize);
CardDetail.initModel(sequelize);
PayPalDetail.initModel(sequelize);

// Set up associations
User.associate();
UserAddress.associate();
UserPayment.associate();

Product.associate();
ProductCategory.associate();
ProductSubCategory.associate();

PaymentMethod.associate();
CardDetail.associate();
PayPalDetail.associate();

export default sequelize;
