import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
// Import database
import sequelize from "./config/database";

// Import routes
import userRouter from "./routes/userRouter";
import uploadRouter from "./routes/uploadRouter";

const app = express();

app.use(cors());
app.use(express.json());

// Set the routes
app.use("/users", userRouter);
app.use("/upload", uploadRouter);

// Serve static files from the 'upload' directory
app.use(express.static(path.join(__dirname, "uploads")));

// Define the port
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4444;

// Function to initialize the server
(async () => {
    try {
        // Check database connection
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        // Sync models with the database
        await sequelize.sync();

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();
