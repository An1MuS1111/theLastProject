const { Sequelize } = require("sequelize");
import dotenv from "dotenv";

import { User, UserAddress, UserPayment } from "../models/User";

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

// Set up associations
User.associate();
UserAddress.associate();
UserPayment.associate();

export default sequelize;
