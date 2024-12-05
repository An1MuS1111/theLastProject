import sequelize from "../config/database"; // Adjust the import path for your sequelize setup
import { UserSeeder } from "./UserSeeder";
import { ProductSeeder } from "./ProductSeeder";

const seedDatabase = async () => {
    try {
        // Sync the database with the force: true option (drops and recreates tables)
        await sequelize.sync({ force: true });
        console.log("All tables have been dropped");

        // Seed the User and Product data
        await UserSeeder(); // Wait for UserSeeder to complete
        await ProductSeeder(); // Wait for ProductSeeder to complete
        console.log("seeding complete");
    } catch (error) {
        console.error("Error during database seeding:", error);
    } finally {
        // Close the connection after seeding is done
        await sequelize.close();
    }
};

// Call the async function to perform the seeding
seedDatabase();
