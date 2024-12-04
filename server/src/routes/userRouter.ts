import { Router, Request, Response } from "express";
import { Op } from "sequelize"; // Import Sequelize operators
import { User } from "../models/User/User";

const router = Router();

// Get all users with optional search
router.get("/", async (req: Request, res: Response) => {
    const { search } = req.query;

    try {
        // Build the search filter using Sequelize's `Op` operators
        const searchFilter = search
            ? {
                  [Op.or]: [
                      { email: { [Op.like]: `%${search}%` } },
                      { name: { [Op.like]: `%${search}%` } },
                  ],
              }
            : {};

        // Fetch users with the search filter applied
        const users = await User.findAll({
            where: searchFilter, // Apply search filter
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error,
        });
    }
});

// Get user by primary key
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        user
            ? res.json(user)
            : res.status(404).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});

// Add user
router.post("/add", async (req: Request, res: Response) => {
    const { email, password, name, telephone, is_admin, image } = req.body;
    try {
        const user = await User.create({
            email,
            password,
            name,
            telephone,
            is_admin,
            image, // Optional attribute
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error });
    }
});

// Update user
router.put("/:id", async (req: Request, res: Response) => {
    const { email, password, name, telephone, is_admin, image } = req.body;

    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update({
                email,
                password,
                name,
                telephone,
                is_admin,
                image, // Optional attribute
            });
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error });
    }
});

// Delete a user by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: "User deleted" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});

export default router;
