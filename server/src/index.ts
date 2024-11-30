import express, { Request, Response } from "express";
import cors from "cors";

// import database
import sequelize from "./config/database";

// import routes
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// check database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
        await sequelize.sync(); // Syncs models with the database
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();


// set the routes
app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
    res.json("Hello");
});

const PORT: number = 4444;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
