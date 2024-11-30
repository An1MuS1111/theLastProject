import { Router, Request, Response } from "express";
import { User } from "../models/User";

const router = Router();

// get all user
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error,
        });
    }
});

// get user by primary key
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

// add user
router.post("/add", async (req: Request, res: Response) => {
    // console.log(req.body);
    const { email, password, name, telephone, is_admin } = req.body;
    try {
        const user = await User.create({
            email,
            password,
            name,
            telephone,
            is_admin,
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error });
    }
});

// update user
router.put("/:id", async (req: Request, res: Response) => {
    const { email, password, name, telephone, is_admin } = req.body;

    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update({
                email,
                password,
                name,
                telephone,
                is_admin,
            });
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error });
    }
});

// delete a user by ID
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
