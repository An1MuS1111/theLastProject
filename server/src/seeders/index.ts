import sequelize from "../config/database"; // Adjust the import path for your sequelize setup
import { UserSeeder } from "./UserSeeder";
import { ProductSeeder } from "./ProductSeeder";

UserSeeder();
ProductSeeder();

sequelize.sync({ force: true });
console.log("All tables have been dropped and recreated.");
